import { getCookie } from 'cookies-next/client';
import { useEffect } from 'react';
import { ACCOUNT_ID_KEY, ACCESS_TOKEN_KEY } from '../constant/api';
import { useRouter } from 'next/navigation';
import { useApiQuery } from './useApiQuery';

export function useAuthorizedSession() {
  const router = useRouter();
  const { fetch, data, loading, error } = useApiQuery('/users/:id', {
    lazy: true,
  });

  const accountId = getCookie(ACCOUNT_ID_KEY);
  const accessToken = getCookie(ACCESS_TOKEN_KEY);
  useEffect(() => {
    if (!accountId || !accessToken) {
      return;
    }

    fetch({
      params: {
        id: accountId,
      },
    });
  }, [accessToken, accountId, fetch, router]);

  return {
    data,
    loading,
    error,
    accessToken,
    accountId,
  };
}
