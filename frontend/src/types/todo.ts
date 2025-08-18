export interface Todo {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
