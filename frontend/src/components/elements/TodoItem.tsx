import { useState } from 'react';
import { X, Pencil, Check } from 'lucide-react';
import { Todo } from '../../@types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (data: { id: string; title: string; description: string }) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit({ id: todo.id, title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  return (
    <li className="p-3 border rounded bg-white">
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-2 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1 w-4 h-4 accent-brand-700"
          />
          <div className="flex flex-col w-full">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-sm font-medium border rounded px-2 py-1 w-full mb-1"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="text-xs text-gray-600 border rounded px-2 pb-1 pt-2 w-full"
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-500 text-sm"
            title="Delete"
          >
            <X size={16} />
          </button>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-700 text-sm"
              title="Save"
            >
              <Check size={16} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-500 text-sm"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
