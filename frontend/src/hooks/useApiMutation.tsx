import { useState, useCallback } from 'react';
import {
  HttpMethod,
  PathForMethod,
  ExtractResponse,
  ApiSchema,
  ExtractParams,
  ExtractBody,
} from '../@types/api';
import { apiFetcher } from '../api/fetcher';

export function useApiMutation<
  M extends Exclude<HttpMethod, 'GET'>,
  P extends PathForMethod<M> & string
>(method: M, path: P) {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalData, setGlobalData] = useState<ExtractResponse<
    ApiSchema[M][P]
  > | null>(null);
  const [globalError, setGlobalError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (
      options: {
        params?: ExtractParams<ApiSchema[M][P]>;
        body?: ExtractBody<ApiSchema[M][P]>;
        query?: Record<string, string | number | boolean>;
        headers?: HeadersInit;
      } = {}
    ) => {
      const state = {
        loading: true,
        data: null as ExtractResponse<ApiSchema[M][P]> | null,
        error: null as Error | null,
      };

      setGlobalLoading(true);
      setGlobalError(null);
      try {
        const response = await apiFetcher(method, path, options);
        state.data = response;
        setGlobalData(response);
        return { ...state, loading: false };
      } catch (err) {
        state.error = err as Error;
        setGlobalError(err as Error);
        return { ...state, loading: false };
      } finally {
        setGlobalLoading(false);
      }
    },
    [method, path]
  );

  return {
    mutate,
    loading: globalLoading,
    data: globalData,
    error: globalError,
  };
}
