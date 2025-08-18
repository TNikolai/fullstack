import mongoose from 'mongoose';

export interface ITodo {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
