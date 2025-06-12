import { useState, useCallback } from 'react';
import {
  PathForMethod,
  ExtractParams,
  ApiSchema,
  ExtractResponse,
} from '../@types/api';
import { apiFetcher } from '../api/fetcher';

export function useApiQuery<P extends PathForMethod<'GET'> & string>(
  path: P,
  options?: {
    params?: ExtractParams<ApiSchema['GET'][P]>;
    query?: Record<string, string | number | boolean>;
    headers?: HeadersInit;
    lazy?: boolean;
  }
) {
  const [data, setData] = useState<ExtractResponse<ApiSchema['GET'][P]> | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(!options?.lazy);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetcher('GET', path, {
        params: options?.params,
        query: options?.query,
        headers: options?.headers,
      });
      setData(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [options?.headers, options?.params, options?.query, path]);

  // Auto-fetch unless lazy
  useState(() => {
    if (!options?.lazy) fetchData();
  });

  return {
    data,
    error,
    loading,
    refetch: fetchData,
  };
}
