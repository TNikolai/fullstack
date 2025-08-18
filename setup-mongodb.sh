#!/bin/bash

echo "🚀 MongoDB Setup for Todo App"
echo "=============================="
echo ""

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "✅ Docker found! You can use option 1 or 2."
else
    echo "❌ Docker not found. Please use option 3 to install MongoDB directly."
fi

echo ""
echo "Choose your MongoDB setup option:"
echo "1. 🐳 Start MongoDB with Docker Compose (Recommended)"
echo "2. 🐳 Start MongoDB with Docker (simple)"
echo "3. 💻 Install MongoDB locally (requires Homebrew)"
echo "4. ☁️  Use MongoDB Atlas (cloud)"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "Starting MongoDB with Docker Compose..."
        docker-compose up -d mongodb
        echo "✅ MongoDB started! Connection string: mongodb://localhost:27017/todoapp"
        ;;
    2)
        echo "Starting MongoDB with Docker..."
        docker run -d --name todo-mongodb -p 27017:27017 mongo:7.0
        echo "✅ MongoDB started! Connection string: mongodb://localhost:27017/todoapp"
        ;;
    3)
        echo "Installing MongoDB with Homebrew..."
        echo "First, let's install Homebrew if not present:"
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo "Installing MongoDB..."
        brew tap mongodb/brew
        brew install mongodb-community
        echo "Starting MongoDB..."
        brew services start mongodb/brew/mongodb-community
        echo "✅ MongoDB installed and started! Connection string: mongodb://localhost:27017/todoapp"
        ;;
    4)
        echo "🌐 For MongoDB Atlas:"
        echo "1. Go to https://www.mongodb.com/atlas"
        echo "2. Create a free account"
        echo "3. Create a new cluster"
        echo "4. Get your connection string"
        echo "5. Update backend/.env with your Atlas connection string"
        echo ""
        echo "Example Atlas connection string:"
        echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        ;;
esac

echo ""
echo "📝 Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Run 'npm run dev' in the root directory to start both frontend and backend"
echo "3. Visit http://localhost:3000 to see your todo app!"
