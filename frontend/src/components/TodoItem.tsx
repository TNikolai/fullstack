import React, { useState } from 'react';
import {
  Box,
  Text,
  Checkbox,
  IconButton,
  Flex,
  Spacer,
  Badge,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Todo } from '@/types/todo';
import { todoApi } from '@/services/api';
import EditTodoModal from './EditTodoModal';

interface TodoItemProps {
  todo: Todo;
  onTodoUpdated: (todo: Todo) => void;
  onTodoDeleted: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onTodoUpdated, onTodoDeleted }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const updatedTodo = await todoApi.updateTodo(todo._id!, {
        completed: !todo.completed,
      });
      onTodoUpdated(updatedTodo);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await todoApi.deleteTodo(todo._id!);
      onTodoDeleted(todo._id!);
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    onDeleteClose();
  };

  return (
    <>
      <Box
        p={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        bg={todo.completed ? 'gray.50' : 'white'}
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
      >
        <Flex align="start">
          <Checkbox
            isChecked={todo.completed}
            onChange={handleToggleComplete}
            isDisabled={isUpdating}
            mr={3}
            mt={1}
          />
          <Box flex="1">
            <Text
              fontSize="lg"
              fontWeight="medium"
              textDecoration={todo.completed ? 'line-through' : 'none'}
              color={todo.completed ? 'gray.500' : 'gray.800'}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text
                mt={2}
                fontSize="sm"
                color={todo.completed ? 'gray.400' : 'gray.600'}
                textDecoration={todo.completed ? 'line-through' : 'none'}
              >
                {todo.description}
              </Text>
            )}
            <Flex mt={2} align="center">
              <Badge colorScheme={todo.completed ? 'green' : 'orange'} size="sm">
                {todo.completed ? 'Completed' : 'Pending'}
              </Badge>
              <Spacer />
              {todo.createdAt && (
                <Text fontSize="xs" color="gray.500">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </Text>
              )}
            </Flex>
          </Box>
          <Flex ml={3}>
            <IconButton
              aria-label="Edit todo"
              icon={<EditIcon />}
              size="sm"
              variant="ghost"
              mr={1}
              onClick={onEditOpen}
            />
            <IconButton
              aria-label="Delete todo"
              icon={<DeleteIcon />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={onDeleteOpen}
            />
          </Flex>
        </Flex>
      </Box>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Todo
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{todo.title}"? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <EditTodoModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        onTodoUpdated={onTodoUpdated}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
