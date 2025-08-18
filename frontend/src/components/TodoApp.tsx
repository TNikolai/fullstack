import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  useDisclosure,
  Flex,
  Spacer,
  Badge,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Todo } from '@/types/todo';
import { todoApi } from '@/services/api';
import AddTodoModal from '@/components/AddTodoModal';
import EditTodoModal from '@/components/EditTodoModal';
import TodoItem from '@/components/TodoItem';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTodos = await todoApi.getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTodoAdded = (newTodo: Todo) => {
    setTodos(prev => [newTodo, ...prev]);
  };

  const handleTodoUpdated = (updatedTodo: Todo) => {
    setTodos(prev =>
      prev.map(todo =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  const handleTodoDeleted = (deletedTodoId: string) => {
    setTodos(prev => prev.filter(todo => todo._id !== deletedTodoId));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (isLoading) {
    return (
      <Container maxW="4xl" py={8}>
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <Box mb={8}>
        <Flex align="center" mb={4}>
          <Heading as="h1" size="xl" color="gray.800">
            My Todo App
          </Heading>
          <Spacer />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={onOpen}
          >
            Add Todo
          </Button>
        </Flex>

        {totalCount > 0 && (
          <Flex gap={4}>
            <Badge colorScheme="blue" p={2} fontSize="sm">
              Total: {totalCount}
            </Badge>
            <Badge colorScheme="green" p={2} fontSize="sm">
              Completed: {completedCount}
            </Badge>
            <Badge colorScheme="orange" p={2} fontSize="sm">
              Pending: {totalCount - completedCount}
            </Badge>
          </Flex>
        )}
      </Box>

      {error && (
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error}
          <Button ml={4} size="sm" onClick={fetchTodos}>
            Retry
          </Button>
        </Alert>
      )}

      {todos.length === 0 ? (
        <Box textAlign="center" py={12}>
          <Text fontSize="lg" color="gray.500" mb={4}>
            No todos yet. Add your first todo to get started!
          </Text>
          <Button colorScheme="blue" onClick={onOpen}>
            Add Your First Todo
          </Button>
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onTodoUpdated={handleTodoUpdated}
              onTodoDeleted={handleTodoDeleted}
            />
          ))}
        </VStack>
      )}

      <AddTodoModal
        isOpen={isOpen}
        onClose={onClose}
        onTodoAdded={handleTodoAdded}
      />
    </Container>
  );
};

export default TodoApp;
