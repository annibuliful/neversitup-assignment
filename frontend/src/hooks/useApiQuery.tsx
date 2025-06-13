import { useState, useCallback, useEffect, useRef } from 'react';
import {
  PathForMethod,
  ExtractParams,
  ApiSchema,
  ExtractResponse,
  ErrorResponse,
} from '../@types/api';
import { apiFetcher } from '../api/fetcher';

interface QueryOptions<P extends PathForMethod<'GET'>> {
  params?: ExtractParams<ApiSchema['GET'][P]>;
  query?: Record<string, string | number | boolean>;
  headers?: HeadersInit;
  lazy?: boolean;
}

export function useApiQuery<P extends PathForMethod<'GET'>>(
  path: P,
  options?: QueryOptions<P>
) {
  const [data, setData] = useState<ExtractResponse<ApiSchema['GET'][P]> | null>(
    null
  );
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const defaultOptionsRef = useRef({
    params: options?.params,
    query: options?.query,
    headers: options?.headers,
  });

  const fetch = useCallback(
    async (overrideOptions?: Omit<QueryOptions<P>, 'lazy'>) => {
      const finalParams = {
        ...defaultOptionsRef.current,
        ...overrideOptions,
      };

      setLoading(true);
      setError(null);
      try {
        const response = await apiFetcher('GET', path, {
          params: finalParams.params,
          query: finalParams.query,
          headers: finalParams.headers,
        });

        setData(response);
        return response;
      } catch (err) {
        setError(err as ErrorResponse);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [path]
  );

  useEffect(() => {
    if (!options?.lazy) {
      fetch();
    }
  }, [fetch, options?.lazy]);

  return {
    data,
    error,
    loading,
    fetch,
  };
}
