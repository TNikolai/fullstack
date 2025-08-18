import axios from 'axios';
import { Todo, ApiResponse, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get<ApiResponse<Todo[]>>('/todos');
    return response.data.data || [];
  },

  // Create a new todo
  createTodo: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await api.post<ApiResponse<Todo>>('/todos', todo);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create todo');
    }
    return response.data.data;
  },

  // Update a todo
  updateTodo: async (id: string, updates: UpdateTodoRequest): Promise<Todo> => {
    const response = await api.put<ApiResponse<Todo>>(`/todos/${id}`, updates);
    console.log('Updates:', updates);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update todo');
    }
    return response.data.data;
  },

  // Delete a todo
  deleteTodo: async (id: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/todos/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete todo');
    }
  },
};
