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

  const updateTodo = async (data: {
    id: string;
    title: string;
    description: string;
  }) => {
    if (!data.title.trim()) return;

    setTodos((prev) =>
      prev.map((todo) => (todo.id === data.id ? { ...todo, ...data } : todo))
    );

    const todo = todos.find((el) => el.id === data.id);

    if (!todo) return;

    const { error } = await updateMutation({
      params: {
        id: data.id,
      },
      body: {
        title: data.title,
        description: data.description,
      },
    });

    if (error) {
      console.error('[toggle-todo]: ', error);
    }
  };

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

    const { error } = await updateMutation({
      params: {
        id,
      },
      body: todo,
    });

    if (error) {
      console.error('[toggle-todo]: ', error);
    }
  };

  const deleteTodo = async (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    const { error } = await deleteMutation({
      params: {
        id,
      },
    });

    if (error) {
      console.error('[delete-todo]: ', error);
    }
  };

  const remainingCount = todos.filter((t) => !t.completed).length;

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
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
