# 🚀 BuddyBuild

BuddyBuild is a high-performance, AI-driven platform designed to streamline code reviews and development workflows. Leveraging the power of Google's Gemini AI, background processing with BullMQ, and a modern React frontend, BuddyBuild provides developers with real-time insights and automated feedback.

---

## ✨ Features

- **🤖 AI-Powered Code Reviews**: Integrated with Google Gemini AI to provide intelligent feedback on code snippets.
- **⚡ Real-time Editor**: A professional-grade code editing experience powered by Monaco Editor.
- **🔄 Background Processing**: Robust task management using Redis and BullMQ for asynchronous operations.
- **🔐 Secure Authentication**: Google OAuth 2.0 integration via Passport.js and JWT-based session management.
- **📊 Usage Tracking**: Monitor AI usage and review history.
- **🎨 Modern UI**: Beautiful, responsive interface built with Tailwind CSS 4 and Motion for smooth animations.

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Cache/Queue**: [Redis](https://redis.io/) & [BullMQ](https://github.com/taskforcesh/bullmq)
- **AI**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Auth**: [Passport.js](https://www.passportjs.org/) & [JSON Web Tokens](https://jwt.io/)

---

## 📂 Project Structure

```text
BuddyBuild/
├── backend/                # Node.js API
│   ├── src/
│   │   ├── ai/             # AI processing logic
│   │   ├── modules/        # Domain modules (auth, reviews, usage)
│   │   ├── queues/         # BullMQ queue definitions
│   │   ├── scripts/        # Database initialization and seeding
│   │   ├── server.ts       # Entry point
│   │   └── ...
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main logical pages (Landing, Editor, Login)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # Axios instance and API calls
│   │   └── App.tsx         # Main router and layout
│   └── package.json
└── readme.md               # You are here
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Redis

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd BuddyBuild
   ```

2. **Setup Backend**:

   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/buddybuild

# Redis
REDIS_URL=redis://127.0.0.1:6379

# AI
GEMINI_API_KEY=your_gemini_api_key

# Auth
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
```

### Running the Application

**Start Backend (Development):**

```bash
cd backend
npm run dev
```

**Start Frontend:**

```bash
cd frontend
npm run dev
```

---

## 📜 Scripts

### Backend

- `npm run dev`: Starts the development server with `ts-node`.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm run start`: Runs the compiled server from `dist/`.
- `npm run db:init`: Initializes the database schema.
- `npm run db:seed`: Seeds the database with initial data.

### Frontend

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the production-ready application.
- `npm run preview`: Previews the production build locally.

---

## 📄 License

This project is licensed under the MIT License.
