'use client';

import { Todo } from '../../@types/todo';
import { useState } from 'react';

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'This is an example of task #1',
      description: '',
      completed: true,
    },
    {
      id: '2',
      title: 'This is an example of task #2',
      description: '',
      completed: false,
    },
    {
      id: '3',
      title: 'This is an example of task #3',
      description: '',
      completed: true,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const addTodo = () => {
    if (!newTitle.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        title: newTitle,
        description: newDescription,
        completed: false,
      },
    ]);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-4 bg-white md:shadow-md md:rounded-md sm:px-6 sm:py-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your To Do</h2>

      <div className="space-y-2 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add new task title..."
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add task description (optional)"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          onClick={addTodo}
          className="w-full bg-brand-700 text-white py-2 rounded hover:bg-brand-500 transition"
        >
          + Add Task
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="p-3 border rounded flex justify-between items-center gap-3 bg-white"
          >
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mt-1 w-4 h-4 accent-brand-700"
              />
              <div className="flex flex-col">
                <p
                  className={`text-sm font-medium ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </p>
                {todo.description && (
                  <p
                    className={`text-xs text-gray-500 ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500 text-sm"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="text-sm mt-4 text-gray-600">
        Your remaining todos: {todos.filter((t) => !t.completed).length}
      </p>
    </div>
  );
}
