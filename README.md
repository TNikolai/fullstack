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
- **Backend**: Express.js REST API with file-based JSON storage
- **Todo Operations**: Create, Read, Update, Delete todos
- **Modern Stack**: TypeScript, ESM modules, and best practices

## Getting Started

### Prerequisites
- Node.js (v18 or later)

### Quick Start

1. **Install all dependencies**:
```bash
npm run setup
```

2. **Start the development servers**:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Health check: http://localhost:5001/health

The app uses file-based JSON storage - no database setup required!## API Endpoints

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
- File-based JSON storage
- TypeScript
- CORS enabled for frontend communication
