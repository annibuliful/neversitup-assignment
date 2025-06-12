import { renderHook, act } from '@testing-library/react';
import { useApiMutation } from '../useApiMutation';
import { apiFetcher } from '../../api/fetcher';

jest.mock('../../api/fetcher', () => ({
  apiFetcher: jest.fn(),
}));

const mockApiFetcher = apiFetcher as jest.MockedFunction<typeof apiFetcher>;

describe('useApiMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial state', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(typeof result.current.mutate).toBe('function');
    });

    it('should work with different HTTP methods', () => {
      const postHook = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );
      const patchHook = renderHook(() =>
        useApiMutation('PATCH', '/api/users/1' as never)
      );
      const deleteHook = renderHook(() =>
        useApiMutation('DELETE', '/api/users/1' as never)
      );

      expect(postHook.result.current.mutate).toBeDefined();
      expect(patchHook.result.current.mutate).toBeDefined();
      expect(deleteHook.result.current.mutate).toBeDefined();
    });
  });

  describe('Successful mutations', () => {
    it('should handle successful POST request', async () => {
      const mockData = { id: 1, name: 'John Doe', email: 'john@example.com' };
      mockApiFetcher.mockResolvedValue(mockData);

      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      let mutationResult;
      await act(async () => {
        mutationResult = await result.current.mutate({
          body: { name: 'John Doe', email: 'john@example.com' },
        } as never);
      });

      expect(mockApiFetcher).toHaveBeenCalledWith('POST', '/api/users', {
        body: { name: 'John Doe', email: 'john@example.com' },
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
      expect(result.current.loading).toBe(false);

      expect(mutationResult).toEqual({
        loading: false,
        data: mockData,
        error: null,
      });
    });

    it('should handle DELETE request with query parameters', async () => {
      const mockData = { success: true, deleted: 1 };
      mockApiFetcher.mockResolvedValue(mockData);

      const { result } = renderHook(() =>
        useApiMutation('DELETE', '/api/users/:id' as never)
      );

      await act(async () => {
        await result.current.mutate({
          params: { id: '1' },
          query: { force: true, reason: 'cleanup' },
        } as never);
      });

      expect(mockApiFetcher).toHaveBeenCalledWith('DELETE', '/api/users/:id', {
        params: { id: '1' },
        query: { force: true, reason: 'cleanup' },
      });

      expect(result.current.data).toEqual(mockData);
    });

    it('should handle mutation with headers', async () => {
      const mockData = { success: true };
      mockApiFetcher.mockResolvedValue(mockData);

      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      await act(async () => {
        await result.current.mutate({
          body: { name: 'Test' },
          headers: {
            Authorization: 'Bearer token123',
            'Content-Type': 'application/json',
          },
        } as never);
      });

      expect(mockApiFetcher).toHaveBeenCalledWith('POST', '/api/users', {
        body: { name: 'Test' },
        headers: {
          Authorization: 'Bearer token123',
          'Content-Type': 'application/json',
        },
      });
    });

    it('should handle mutation with all options', async () => {
      const mockData = { id: 1, updated: true };
      mockApiFetcher.mockResolvedValue(mockData);

      const { result } = renderHook(() =>
        useApiMutation('PATCH', '/api/users/:id' as never)
      );

      await act(async () => {
        await result.current.mutate({
          params: { id: '1' },
          body: { name: 'New Name' },
          query: { validate: true },
          headers: { Authorization: 'Bearer token' },
        } as never);
      });

      expect(mockApiFetcher).toHaveBeenCalledWith('PATCH', '/api/users/:id', {
        params: { id: '1' },
        body: { name: 'New Name' },
        query: { validate: true },
        headers: { Authorization: 'Bearer token' },
      });

      expect(result.current.data).toEqual(mockData);
    });
  });

  describe('Error handling', () => {
    it('should handle API errors correctly', async () => {
      const mockError = {
        message: 'Validation failed',
        status: 400,
        code: 'VALIDATION_ERROR',
        details: { name: 'Name is required' },
      };

      const errorMessage = JSON.stringify(mockError);
      mockApiFetcher.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      let mutationResult;
      await act(async () => {
        mutationResult = await result.current.mutate({
          body: { email: 'test@example.com' },
        } as never);
      });

      expect(result.current.data).toBe(null);
      expect(result.current.error).toEqual(mockError);
      expect(result.current.loading).toBe(false);

      expect(mutationResult).toEqual({
        loading: false,
        data: null,
        error: mockError,
      });
    });

    it('should handle network errors', async () => {
      const networkError = {
        message: 'Network request failed',
        status: 0,
        code: 'NETWORK_ERROR',
      };

      mockApiFetcher.mockRejectedValue(new Error(JSON.stringify(networkError)));

      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      await act(async () => {
        await result.current.mutate({ body: { name: 'Test' } } as never);
      });

      expect(result.current.error).toEqual(networkError);
      expect(result.current.data).toBe(null);
    });

    it('should clear previous error on new successful mutation', async () => {
      const mockError = { message: 'Server error', status: 500 };
      const mockData = { id: 1, name: 'Success' };

      mockApiFetcher.mockRejectedValueOnce(
        new Error(JSON.stringify(mockError))
      );

      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      await act(async () => {
        await result.current.mutate({ body: { name: 'Test' } } as never);
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBe(null);

      mockApiFetcher.mockResolvedValue(mockData);

      await act(async () => {
        await result.current.mutate({
          body: { name: 'Test Success' },
        } as never);
      });

      expect(result.current.error).toBe(null);
      expect(result.current.data).toEqual(mockData);
    });
  });

  describe('Loading states', () => {
    it('should set loading to true during mutation and false after completion', async () => {
      const mockData = { success: true };
      let resolvePromise: (value: any) => void;

      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockApiFetcher.mockReturnValue(promise as any);

      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      expect(result.current.loading).toBe(false);

      let mutationPromise: Promise<any>;
      act(() => {
        mutationPromise = result.current.mutate({
          body: { name: 'Test' },
        } as never);
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        resolvePromise(mockData);
        await mutationPromise;
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
    });

    it('should set loading to false even when mutation fails', async () => {
      const mockError = { message: 'Server error' };
      mockApiFetcher.mockRejectedValue(new Error(JSON.stringify(mockError)));

      const { result } = renderHook(() =>
        useApiMutation('POST', '/api/users' as never)
      );

      await act(async () => {
        await result.current.mutate({ body: { name: 'Test' } } as never);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });
  });
});
