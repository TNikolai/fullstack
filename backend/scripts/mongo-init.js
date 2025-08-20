// MongoDB initialization script
db = db.getSiblingDB('todoapp');

// Create a user for the todo app
db.createUser({
  user: 'todouser',
  pwd: 'todopass',
  roles: [
    {
      role: 'readWrite',
      db: 'todoapp'
    }
  ]
});

// Create todos collection and add some sample data
db.createCollection('todos');

// Insert sample todos
db.todos.insertMany([
  {
    title: "Welcome to MongoDB Todo App!",
    description: "This todo is stored in MongoDB running in Docker",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Learn MongoDB with Docker",
    description: "Understanding how to use MongoDB in a containerized environment",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('✅ MongoDB initialized with sample data!');
