import { Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

const router = Router();

// GET /api/todos - Get all todos
router.get('/', getTodos);

// POST /api/todos - Create a new todo
router.post('/', createTodo);

// PUT /api/todos/:id - Update a todo
router.put('/:id', updateTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', deleteTodo);

export default router;
