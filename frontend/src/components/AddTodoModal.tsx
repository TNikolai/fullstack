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
import { Todo, CreateTodoRequest } from '@/types/todo';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTodoAdded: (todo: Todo) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose, onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      const newTodo: CreateTodoRequest = {
        title: title.trim(),
        description: description.trim() || undefined,
      };

      const createdTodo = await todoApi.createTodo(newTodo);
      onTodoAdded(createdTodo);

      toast({
        title: 'Success',
        description: 'Todo created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      handleClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Todo</ModalHeader>
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

export default AddTodoModal;
