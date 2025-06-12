import { renderHook, act, waitFor } from '@testing-library/react';
import { useApiQuery } from '../useApiQuery';
import { apiFetcher } from '../../api/fetcher';

jest.mock('../../api/fetcher', () => ({
  apiFetcher: jest.fn(),
}));

const mockApiFetcher = apiFetcher as jest.MockedFunction<typeof apiFetcher>;

describe('useApiQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful API calls', () => {
    it('should fetch data automatically when not lazy', async () => {
      const mockData = { users: [{ id: 1, name: 'John' }] };
      mockApiFetcher.mockResolvedValue(mockData);

      const { result } = renderHook(() => useApiQuery('/api/users' as never));

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
      expect(mockApiFetcher).toHaveBeenCalledWith('GET', '/api/users', {
        params: undefined,
        query: undefined,
        headers: undefined,
      });
    });

    it('should not fetch data automatically when lazy is true', async () => {
      const mockData = { users: [{ id: 1, name: 'John' }] };
      mockApiFetcher.mockResolvedValue(mockData);

      const { result } = renderHook(() =>
        useApiQuery('/api/users' as never, { lazy: true })
      );

      expect(mockApiFetcher).not.toHaveBeenCalled();
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
    });

    it('should fetch data when refetch is called on lazy query', async () => {
      const mockData = { users: [{ id: 1, name: 'John' }] };
      mockApiFetcher.mockResolvedValue(mockData);

      const { result } = renderHook(() =>
        useApiQuery('/api/users' as never, { lazy: true })
      );

      await act(async () => {
        await result.current.refetch();
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(mockApiFetcher).toHaveBeenCalledWith('GET', '/api/users', {
        params: undefined,
        query: undefined,
        headers: undefined,
      });
    });
  });

  describe('API call with options', () => {
    it('should pass params, query, and headers to apiFetcher', async () => {
      const mockData = { user: { id: 1, name: 'John' } };
      mockApiFetcher.mockResolvedValue(mockData);

      const options = {
        params: { id: '1' },
        query: { include: 'profile', active: true },
        headers: { Authorization: 'Bearer token123' },
      };

      const { result } = renderHook(() =>
        useApiQuery('/api/users/:id' as never, options as never)
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(mockApiFetcher).toHaveBeenCalledWith('GET', '/api/users/:id', {
        params: { id: '1' },
        query: { include: 'profile', active: true },
        headers: { Authorization: 'Bearer token123' },
      });
      expect(result.current.data).toEqual(mockData);
    });
  });

  describe('Error handling', () => {
    it('should handle API errors correctly', async () => {
      const mockError = {
        message: 'User not found',
        status: 404,
        code: 'USER_NOT_FOUND',
      };
      mockApiFetcher.mockRejectedValue(mockError);

      const { result } = renderHook(() =>
        useApiQuery('/api/users/999' as never)
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBe(null);
      expect(result.current.error).toEqual(mockError);
      expect(result.current.loading).toBe(false);
    });

    it('should clear previous error when refetching', async () => {
      const mockError = { message: 'Server error', status: 500 };
      const mockData = { users: [] };

      mockApiFetcher.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() =>
        useApiQuery('/api/users' as never, { lazy: true })
      );

      await act(async () => {
        await result.current.refetch();
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBe(null);

      mockApiFetcher.mockResolvedValue(mockData);

      await act(async () => {
        await result.current.refetch();
      });

      expect(result.current.error).toBe(null);
      expect(result.current.data).toEqual(mockData);
    });
  });

  describe('Loading states', () => {
    it('should set loading to true during fetch and false after completion', async () => {
      const mockData = { users: [] };
      let resolvePromise: (value: unknown) => void;

      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockApiFetcher.mockReturnValue(promise as never);

      const { result } = renderHook(() =>
        useApiQuery('/api/users' as never, { lazy: true })
      );

      expect(result.current.loading).toBe(false);

      act(() => {
        result.current.refetch();
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        resolvePromise(mockData);
        await promise;
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
    });

    it('should set loading to false even when API call fails', async () => {
      const mockError = { message: 'Network error' };
      mockApiFetcher.mockRejectedValue(mockError);

      const { result } = renderHook(() => useApiQuery('/api/users' as never));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });
  });
});
