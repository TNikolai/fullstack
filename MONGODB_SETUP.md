# MongoDB Setup Instructions

## Quick Setup Options

### Option 1: Install MongoDB with Homebrew (Recommended for macOS)

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install MongoDB**:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

3. **Start MongoDB**:
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

4. **Verify MongoDB is running**:
   ```bash
   brew services list | grep mongodb
   ```

### Option 2: Install Docker and use MongoDB container

1. **Download Docker Desktop** from: https://www.docker.com/products/docker-desktop
2. **Start MongoDB with Docker**:
   ```bash
   docker run -d --name todo-mongodb -p 27017:27017 mongo:7.0
   ```

### Option 3: Use MongoDB Atlas (Cloud - Free Tier Available)

1. Go to: https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `backend/.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
   ```

## After MongoDB is running:

1. **Install all dependencies**:
   ```bash
   npm run install:all
   ```

2. **Start the development servers**:
   ```bash
   npm run dev
   ```

3. **Access your app**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health check: http://localhost:5000/health

## Troubleshooting

- **Connection refused error**: MongoDB is not running
- **Authentication error**: Check your connection string in `.env`
- **Port already in use**: Another process is using port 27017

## Database Connection Strings

- **Local MongoDB**: `mongodb://localhost:27017/todoapp`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/todoapp`
- **Docker MongoDB**: `mongodb://localhost:27017/todoapp`
