import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../useTodos';
import { useApiQuery } from '../useApiQuery';
import { useApiMutation } from '../useApiMutation';

jest.mock('../useApiQuery');
jest.mock('../useApiMutation');

const mockUseApiQuery = useApiQuery as jest.MockedFunction<typeof useApiQuery>;
const mockUseApiMutation = useApiMutation as jest.MockedFunction<
  typeof useApiMutation
>;

const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('useTodos', () => {
  const mockTodos = [
    {
      id: '1',
      title: 'Todo 1',
      description: 'Description 1',
      completed: false,
    },
    { id: '2', title: 'Todo 2', description: 'Description 2', completed: true },
    {
      id: '3',
      title: 'Todo 3',
      description: 'Description 3',
      completed: false,
    },
  ];

  const mockCreateMutation = jest.fn();
  const mockDeleteMutation = jest.fn();
  const mockUpdateMutation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseApiQuery.mockReturnValue({
      data: { isSuccess: true, data: mockTodos },
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    mockUseApiMutation.mockImplementation((method, path) => {
      if (method === 'POST' && path === '/todo') {
        return {
          mutate: mockCreateMutation,
          loading: false,
          error: null,
          data: null,
        };
      }
      if (method === 'DELETE' && path === '/todo/:id') {
        return {
          mutate: mockDeleteMutation,
          loading: false,
          error: null,
          data: null,
        };
      }
      if (method === 'PATCH' && path === '/todo/:id') {
        return {
          mutate: mockUpdateMutation,
          loading: false,
          error: null,
          data: null,
        };
      }
      return {
        mutate: jest.fn(),
        loading: false,
        error: null,
        data: null,
      };
    });
  });

  describe('Initial state and data loading', () => {
    it('should initialize with correct initial state', () => {
      const { result } = renderHook(() => useTodos());

      expect(result.current.todos).toEqual(mockTodos);
      expect(result.current.remainingCount).toBe(2);
      expect(result.current.todoFetching).toBe(false);
      expect(result.current.todoFetchingError).toBe(null);
    });

    it('should handle loading state from API query', () => {
      mockUseApiQuery.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useTodos());

      expect(result.current.todoFetching).toBe(true);
      expect(result.current.todos).toEqual([]);
    });

    it('should handle error state from API query', () => {
      const mockError = { message: 'Failed to fetch todos' };
      mockUseApiQuery.mockReturnValue({
        data: null,
        loading: false,
        error: mockError,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useTodos());

      expect(result.current.todoFetchingError).toEqual(mockError);
      expect(result.current.todos).toEqual([]);
    });

    it('should not update todos when API response is not successful', () => {
      mockUseApiQuery.mockReturnValue({
        data: { isSuccess: false, data: [] },
        loading: false,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useTodos());

      expect(result.current.todos).toEqual([]);
    });

    it('should update todos when API response changes', () => {
      const { result, rerender } = renderHook(() => useTodos());

      expect(result.current.todos).toEqual(mockTodos);

      const newTodos = [
        {
          id: '4',
          title: 'New Todo',
          description: 'New Description',
          completed: false,
        },
      ];

      mockUseApiQuery.mockReturnValue({
        data: { isSuccess: true, data: newTodos },
        loading: false,
        error: null,
        refetch: jest.fn(),
      });

      rerender();

      expect(result.current.todos).toEqual(newTodos);
    });
  });

  describe('addTodo', () => {
    it('should add a new todo successfully', async () => {
      const newTodo = {
        id: '4',
        title: 'New Todo',
        description: 'New Description',
        completed: false,
      };
      mockCreateMutation.mockResolvedValue({
        data: { isSuccess: true, data: newTodo },
        error: null,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.addTodo('New Todo', 'New Description');
      });

      expect(mockCreateMutation).toHaveBeenCalledWith({
        body: {
          title: 'New Todo',
          description: 'New Description',
          completed: false,
        },
      });

      expect(result.current.todos).toHaveLength(4);
      expect(result.current.todos[3]).toEqual(newTodo);
    });

    it('should not add todo with empty title', async () => {
      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.addTodo('', 'Description');
      });

      expect(mockCreateMutation).not.toHaveBeenCalled();
      expect(result.current.todos).toHaveLength(3);
    });

    it('should not add todo with whitespace-only title', async () => {
      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.addTodo('   ', 'Description');
      });

      expect(mockCreateMutation).not.toHaveBeenCalled();
      expect(result.current.todos).toHaveLength(3);
    });

    it('should handle creation error', async () => {
      const mockError = { message: 'Creation failed' };
      mockCreateMutation.mockResolvedValue({
        data: { isSuccess: false },
        error: mockError,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.addTodo('New Todo', 'Description');
      });

      expect(console.error).toHaveBeenCalledWith('[add-todo]: ', mockError);
      expect(result.current.todos).toHaveLength(3);
    });

    it('should handle null response', async () => {
      mockCreateMutation.mockResolvedValue({
        data: null,
        error: null,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.addTodo('New Todo', 'Description');
      });

      expect(console.error).toHaveBeenCalledWith('[add-todo]: ', null);
      expect(result.current.todos).toHaveLength(3);
    });
  });

  describe('updateTodo', () => {
    it('should update todo successfully', async () => {
      mockUpdateMutation.mockResolvedValue({
        data: { isSuccess: true },
        error: null,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.updateTodo({
          id: '1',
          title: 'Updated Title',
          description: 'Updated Description',
        });
      });

      expect(mockUpdateMutation).toHaveBeenCalledWith({
        params: { id: '1' },
        body: {
          title: 'Updated Title',
          description: 'Updated Description',
        },
      });

      const updatedTodo = result.current.todos.find((t) => t.id === '1');
      expect(updatedTodo?.title).toBe('Updated Title');
      expect(updatedTodo?.description).toBe('Updated Description');
    });

    it('should not update todo with empty title', async () => {
      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.updateTodo({
          id: '1',
          title: '',
          description: 'Description',
        });
      });

      expect(mockUpdateMutation).not.toHaveBeenCalled();
      expect(result.current.todos[0].title).toBe('Todo 1');
    });

    it('should not update todo with whitespace-only title', async () => {
      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.updateTodo({
          id: '1',
          title: '   ',
          description: 'Description',
        });
      });

      expect(mockUpdateMutation).not.toHaveBeenCalled();
    });

    it('should not update non-existent todo', async () => {
      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.updateTodo({
          id: 'non-existent',
          title: 'Title',
          description: 'Description',
        });
      });

      expect(mockUpdateMutation).not.toHaveBeenCalled();
    });

    it('should handle update error', async () => {
      const mockError = { message: 'Update failed' };
      mockUpdateMutation.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.updateTodo({
          id: '1',
          title: 'Updated Title',
          description: 'Updated Description',
        });
      });

      expect(console.error).toHaveBeenCalledWith('[toggle-todo]: ', mockError);
    });
  });

  describe('toggleTodo', () => {
    it('should toggle todo completion status successfully', async () => {
      mockUpdateMutation.mockResolvedValue({
        data: { isSuccess: true },
        error: null,
      });

      const { result } = renderHook(() => useTodos());

      const originalCompletedStatus = result.current.todos[0].completed;

      await act(async () => {
        await result.current.toggleTodo('1');
      });

      expect(mockUpdateMutation).toHaveBeenCalledWith({
        params: { id: '1' },
        body: expect.objectContaining({
          id: '1',
          completed: !originalCompletedStatus,
        }),
      });
    });

    it('should not toggle non-existent todo', async () => {
      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.toggleTodo('non-existent');
      });

      expect(mockUpdateMutation).not.toHaveBeenCalled();
    });

    it('should handle toggle error', async () => {
      const mockError = { message: 'Toggle failed' };
      mockUpdateMutation.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.toggleTodo('1');
      });

      expect(console.error).toHaveBeenCalledWith('[toggle-todo]: ', mockError);
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo successfully', async () => {
      mockDeleteMutation.mockResolvedValue({
        data: { isSuccess: true },
        error: null,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.deleteTodo('1');
      });

      expect(mockDeleteMutation).toHaveBeenCalledWith({
        params: { id: '1' },
      });

      expect(result.current.todos).toHaveLength(2);
      expect(result.current.todos.find((t) => t.id === '1')).toBeUndefined();
    });

    it('should handle delete error', async () => {
      const mockError = { message: 'Delete failed' };
      mockDeleteMutation.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.deleteTodo('1');
      });

      expect(console.error).toHaveBeenCalledWith('[delete-todo]: ', mockError);
      expect(result.current.todos).toHaveLength(2);
    });
  });

  describe('Loading and error states', () => {
    it('should expose all loading states', () => {
      mockUseApiMutation.mockImplementation((method, path) => {
        if (method === 'POST') {
          return { mutate: jest.fn(), loading: true, error: null, data: null };
        }
        if (method === 'DELETE') {
          return { mutate: jest.fn(), loading: false, error: null, data: null };
        }
        if (method === 'PATCH') {
          return { mutate: jest.fn(), loading: false, error: null, data: null };
        }
        return { mutate: jest.fn(), loading: false, error: null, data: null };
      });

      const { result } = renderHook(() => useTodos());

      expect(result.current.createLoading).toBe(true);
      expect(result.current.updateLoading).toBe(false);
      expect(result.current.deleteLoading).toBe(false);
    });

    it('should expose all error states', () => {
      const createError = { message: 'Create error' };
      const updateError = { message: 'Update error' };
      const deleteError = { message: 'Delete error' };

      mockUseApiMutation.mockImplementation((method, path) => {
        if (method === 'POST') {
          return {
            mutate: jest.fn(),
            loading: false,
            error: createError,
            data: null,
          };
        }
        if (method === 'DELETE') {
          return {
            mutate: jest.fn(),
            loading: false,
            error: deleteError,
            data: null,
          };
        }
        if (method === 'PATCH') {
          return {
            mutate: jest.fn(),
            loading: false,
            error: updateError,
            data: null,
          };
        }
        return { mutate: jest.fn(), loading: false, error: null, data: null };
      });

      const { result } = renderHook(() => useTodos());

      expect(result.current.createError).toEqual(createError);
      expect(result.current.updateError).toEqual(updateError);
      expect(result.current.deleteError).toEqual(deleteError);
    });
  });
});
