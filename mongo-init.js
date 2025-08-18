// Initialize the todo database
db = db.getSiblingDB('todoapp');

// Create a user for the todo app (optional, for production)
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

// Create an initial collection (optional)
db.createCollection('todos');

print('Database initialized successfully!');
