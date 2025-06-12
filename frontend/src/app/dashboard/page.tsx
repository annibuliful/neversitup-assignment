'use client';

import { useRouter } from 'next/navigation';
import { TodoItem } from '../../components/elements/TodoItem';
import { TodoForm } from '../../components/form/TodoForm';
import { useTodos } from '../../hooks/useTodos';
import { deleteCookie } from 'cookies-next';
import { ACCESS_ID_KEY, ACCESS_TOKEN_KEY } from '../../constant/api';

export default function Page() {
  const router = useRouter();
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    remainingCount,
    createLoading,
  } = useTodos();

  const handleLogout = async () => {
    await deleteCookie(ACCESS_TOKEN_KEY);
    await deleteCookie(ACCESS_ID_KEY);
    router.push('/');
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-4 bg-white md:shadow-md md:rounded-md sm:px-6 sm:py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Your To Do</h2>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      <TodoForm onAdd={addTodo} loading={createLoading} />

      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      <p className="text-sm mt-4 text-gray-600">
        Your remaining todos: {remainingCount}
      </p>
    </div>
  );
}
