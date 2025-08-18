# Fullstack Todo App

A modern fullstack todo application built with the MERN stack and Next.js.

## Project Structure

```
fullstack/
├── frontend/          # Next.js React app with Chakra UI
├── backend/           # Express.js API with MongoDB
└── package.json       # Monorepo configuration
```

## Features

- **Frontend**: React/Next.js with Chakra UI for beautiful components
- **Backend**: Express.js REST API with MongoDB for data persistence
- **Todo Operations**: Create, Read, Update, Delete todos
- **Modern Stack**: TypeScript, ESM modules, and best practices

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB (see setup options below)

### Quick Start

1. **Install all dependencies**:
```bash
npm run setup
```

2. **Set up MongoDB** (choose one option):

   **Option A: Install MongoDB locally with Homebrew (macOS)**:
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   # Install and start MongoDB
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb/brew/mongodb-community
   ```

   **Option B: Use Docker**:
   ```bash
   # If you have Docker installed
   npm run mongodb:docker
   ```

   **Option C: Use MongoDB Atlas (Cloud)**:
   - Go to https://www.mongodb.com/atlas
   - Create a free account and cluster
   - Update `backend/.env` with your connection string

3. **Start the development servers**:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health check: http://localhost:5000/health

### Troubleshooting

If you see a MongoDB connection error:
1. Make sure MongoDB is running: `npm run health`
2. Check the connection string in `backend/.env`
3. See `MONGODB_SETUP.md` for detailed setup instructions

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Technologies Used

### Frontend
- Next.js 14
- React 18
- Chakra UI
- TypeScript
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript
- CORS enabled for frontend communication
