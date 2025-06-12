import { useForm } from 'react-hook-form';

interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
  loading: boolean;
}

interface FormData {
  title: string;
  description: string;
}

export function TodoForm({ onAdd, loading = false }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = ({ title, description }: FormData) => {
    onAdd(title.trim(), description || '');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="Add new task title..."
        disabled={loading}
        className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          errors.title ? 'border-red-500 ring-red-400' : 'focus:ring-brand-500'
        }`}
        {...register('title', {
          required: 'Title is required',
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters',
          },
        })}
      />
      {errors.title && (
        <p className="text-sm text-red-500 -mt-1">{errors.title.message}</p>
      )}

      <textarea
        placeholder="Add task description (optional)"
        disabled={loading}
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        {...register('description')}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded transition text-white ${
          loading
            ? 'bg-brand-300 cursor-not-allowed'
            : 'bg-brand-700 hover:bg-brand-500'
        }`}
      >
        {loading ? 'Adding...' : '+ Add Task'}
      </button>
    </form>
  );
}
