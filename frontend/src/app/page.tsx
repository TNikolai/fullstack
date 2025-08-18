'use client';

import { ChakraProvider } from '@chakra-ui/react';
import TodoApp from '@/components/TodoApp';

export default function Home() {
  return (
    <ChakraProvider>
      <TodoApp />
    </ChakraProvider>
  );
}
