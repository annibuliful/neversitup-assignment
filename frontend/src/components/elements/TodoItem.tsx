import { Todo } from '../../@types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="p-3 border rounded flex justify-between items-center gap-3 bg-white">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
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
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 text-sm"
      >
        ✕
      </button>
    </li>
  );
}
