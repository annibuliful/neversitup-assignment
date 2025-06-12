import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
  loading: boolean;
}

export function TodoForm({ onAdd, loading = false }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task title..."
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        disabled={loading}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add task description (optional)"
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        disabled={loading}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded transition text-white ${
          loading
            ? 'bg-brand-300 cursor-not-allowed'
            : 'bg-brand-700 hover:bg-brand-500'
        }`}
      >
        {loading ? 'Adding...' : '+ Add Task'}
      </button>
    </div>
  );
}
