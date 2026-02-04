-- 1. Enable UUID extension for un-guessable IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Enums for rigid state management
CREATE TYPE review_status AS ENUM (
    'PENDING',      -- Received by API, waiting for Worker
    'PROCESSING',   -- Worker picked it up
    'COMPLETED',    -- Success
    'FAILED'        -- AI error or Validation error
);

CREATE TYPE issue_severity AS ENUM (
    'CRITICAL', -- 5
    'HIGH',     -- 4
    'MEDIUM',   -- 3
    'LOW',      -- 2
    'INFO'      -- 1
);

-- 3. Users Table (Minimal for now, expandable for Stripe)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Personas (The "Products" available to choose)
CREATE TABLE personas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'strict-senior', 'security-audit'
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Prompt Versions (The "Logic" behind the products)
-- CRITICAL: We never update a prompt. We insert a new version.
CREATE TABLE persona_prompt_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    persona_id UUID REFERENCES personas(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    system_prompt_template TEXT NOT NULL, -- The specific instructions sent to AI
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(persona_id, version_number)
);

-- 6. Code Reviews (The Central Transaction)
CREATE TABLE code_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Keep stats if user deleted? Or cascade?
    persona_version_id UUID REFERENCES persona_prompt_versions(id), -- Links to exact logic used
    
    -- Input Data
    code_snippet TEXT NOT NULL, -- CAUTION: Limit this in API middleware (e.g. 50kb max)
    file_name VARCHAR(255),
    language VARCHAR(50),
    
    -- Processing State
    status review_status DEFAULT 'PENDING',
    
    -- Output Data
    calculated_score INT CHECK (calculated_score >= 0 AND calculated_score <= 100),
    summary TEXT,
    raw_ai_response JSONB, -- Full dump for debugging/audit
    
    -- Observability
    tokens_used INT DEFAULT 0,
    processing_time_ms INT DEFAULT 0,
    error_message TEXT, -- If status = FAILED
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Review Issues (Normalized Data for Analytics)
-- Allows querying: "What is the most common security flaw?"
CREATE TABLE review_issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES code_reviews(id) ON DELETE CASCADE,
    
    category VARCHAR(50) NOT NULL, -- 'security', 'performance', etc.
    severity INT CHECK (severity >= 1 AND severity <= 5),
    line_start INT,
    line_end INT,
    description TEXT NOT NULL,
    suggestion TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Indexes for Performance
CREATE INDEX idx_reviews_user ON code_reviews(user_id);
CREATE INDEX idx_reviews_status ON code_reviews(status); -- For finding stuck jobs
CREATE INDEX idx_issues_category ON review_issues(category); -- For analytics