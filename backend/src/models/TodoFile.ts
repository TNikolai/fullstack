import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ITodo {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const DATA_FILE = path.join(__dirname, '../../data/todos.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Generate a simple ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Read todos from file
const readTodos = async (): Promise<ITodo[]> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
};

// Write todos to file
const writeTodos = async (todos: ITodo[]): Promise<void> => {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
};

export const Todo = {
  // Find all todos
  find: () => ({
    sort: async (sortOptions: any) => {
      const todos = await readTodos();
      // Simple sort by createdAt descending
      return todos.sort((a, b) => {
        const aDate = new Date(a.createdAt || 0).getTime();
        const bDate = new Date(b.createdAt || 0).getTime();
        return bDate - aDate;
      });
    }
  }),

  // Save a new todo
  save: async function(this: ITodo): Promise<ITodo> {
    const todos = await readTodos();
    const newTodo: ITodo = {
      ...this,
      _id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    todos.push(newTodo);
    await writeTodos(todos);
    return newTodo;
  },

  // Find by ID and update
  findByIdAndUpdate: async (id: string, updateData: Partial<ITodo>, options: any = {}): Promise<ITodo | null> => {
    const todos = await readTodos();
    const todoIndex = todos.findIndex(todo => todo._id === id);
    
    if (todoIndex === -1) {
      return null;
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...updateData,
      updatedAt: new Date()
    };

    todos[todoIndex] = updatedTodo;
    await writeTodos(todos);
    
    return updatedTodo;
  },

  // Find by ID and delete
  findByIdAndDelete: async (id: string): Promise<ITodo | null> => {
    const todos = await readTodos();
    const todoIndex = todos.findIndex(todo => todo._id === id);
    
    if (todoIndex === -1) {
      return null;
    }

    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    await writeTodos(todos);
    
    return deletedTodo;
  }
};

// Constructor function to create new todo instances
export const createTodo = (data: Omit<ITodo, '_id' | 'createdAt' | 'updatedAt'>): ITodo & { save: () => Promise<ITodo> } => {
  return {
    ...data,
    save: async function() {
      return await Todo.save.call(this);
    }
  };
};
