import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { todoApi } from '@/services/api';
import { Todo, UpdateTodoRequest } from '@/types/todo';

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTodoUpdated: (todo: Todo) => void;
  todo: Todo;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ isOpen, onClose, onTodoUpdated, todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Title is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const editTodo: UpdateTodoRequest = {
        title: title.trim(),
        description: description.trim() || undefined,
        completed: todo.completed,
      };

      const updatedTodo = await todoApi.updateTodo(todo._id!, editTodo);
      onTodoUpdated(updatedTodo);

      toast({
        title: 'Success',
        description: 'Todo updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      handleClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter todo title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description (optional)</FormLabel>
            <Textarea
              placeholder="Enter todo description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            Add Todo
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTodoModal;
