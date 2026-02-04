### Frontend

- React
- Tailwind CSS
- Monaco Editor

### Backend

- Node.js
- Express
- PostgreSQL
- Redis
- BullMQ

### AI

- LLM via abstraction layer (Gemini / OpenAI / etc.)
- Prompt engine with versioning and schema enforcement

### Auth & SaaS

- Google OAuth
- JWT
- Rate limiting
- Usage tracking
- Stripe (future phase)

---

## BACKEND FOLDER STRUCTURE (MANDATORY)

src/
├── app.ts
├── server.ts
├── config/
├── modules/
│ ├── auth/
│ ├── users/
│ ├── personas/
│ ├── reviews/
│ └── usage/
├── ai/
│ ├── ai.interface.ts
│ ├── ai.factory.ts
│ ├── providers/
│ └── prompt-engine.ts
├── queues/
├── middlewares/
├── utils/
├── types/
└── tests/

## DATABASE DESIGN (ALREADY DECIDED)

Core tables:

- users
- auth_accounts
- personas
- persona_prompt_versions
- code_reviews
- review_issues
- usage_logs
- subscriptions

Each review references:

- user
- persona
- prompt version
- async status
