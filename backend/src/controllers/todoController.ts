import { Request, Response } from 'express';
import { Todo, ITodo, createTodo as createNewTodo } from '../models/TodoFile.js';

// Get all todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create a new todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      res.status(400).json({
        success: false,
        message: 'Title is required'
      });
      return;
    }

    const todo = createNewTodo({
      title: title.trim(),
      description: description?.trim() || '',
      completed: false
    });

    const savedTodo = await todo.save();
    
    res.status(201).json({
      success: true,
      data: savedTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};// Update a todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updateData: Partial<ITodo> = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = completed;

    const todo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
