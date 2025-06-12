import { useEffect, useState } from 'react';
import { Todo } from '../@types/todo';
import { useApiQuery } from './useApiQuery';
import { useApiMutation } from './useApiMutation';

export function useTodos() {
  const {
    data: todoResponse,
    loading: todoFetching,
    error: todoFetchingError,
  } = useApiQuery('/todo');

  const {
    mutate: createMutation,
    loading: createLoading,
    error: createError,
  } = useApiMutation('POST', '/todo');

  const {
    mutate: deleteMutation,
    loading: deleteLoading,
    error: deleteError,
  } = useApiMutation('DELETE', '/todo/:id');

  const {
    mutate: updateMutation,
    loading: updateLoading,
    error: updateError,
  } = useApiMutation('PATCH', '/todo/:id');

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!todoResponse?.isSuccess) return;

    setTodos(todoResponse.data);
  }, [todoResponse]);

  const addTodo = async (title: string, description: string) => {
    if (!title.trim()) return;

    const { data: response, error } = await createMutation({
      body: {
        title,
        description,
        completed: false,
      },
    });

    if (!response?.isSuccess) {
      console.error('[add-todo]: ', error);
      return;
    }

    setTodos((prev) => [...prev, response.data]);
  };

  const toggleTodo = async (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const todo = todos.find((el) => el.id === id);

    if (!todo) return;

    todo.completed = !todo.completed;

    await updateMutation({
      params: {
        id,
      },
      body: todo,
    });
  };

  const deleteTodo = async (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    await deleteMutation({
      params: {
        id,
      },
    });
  };

  const remainingCount = todos.filter((t) => !t.completed).length;

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    remainingCount,
    todoFetching,
    todoFetchingError,
    createLoading,
    createError,
    updateError,
    updateLoading,
    deleteError,
    deleteLoading,
  };
}
