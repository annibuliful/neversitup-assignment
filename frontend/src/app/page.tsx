'use client';

import { useEffect, useState } from 'react';
import { SignInForm } from '../components/form/SignInForm';
import { SignUpForm } from '../components/form/SignUpForm';
import { AuthTabs } from '../components/elements/AuthTabs';
import { useApiMutation } from '../hooks/useApiMutation';
import { setCookie } from 'cookies-next';
import { ACCOUNT_ID_KEY, ACCESS_TOKEN_KEY } from '../constant/api';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useAuthorizedSession } from '../hooks/useAuthorizedSession';
import { randomString } from '../utils/random';

export default function Page() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);

  const { data: authenticatedData, loading: authenticationLoading } =
    useAuthorizedSession();

  const {
    mutate: signUpMutation,
    loading: signUpLoading,
    error: signUpError,
  } = useApiMutation('POST', '/users');

  const {
    mutate: signInMutation,
    loading: signInLoading,
    error: signInError,
  } = useApiMutation('POST', '/auth/login');

  const handleSkipSignIn = async () => {
    const username = randomString(9);
    const password = randomString(9);
    await signUpMutation({
      body: {
        username,
        password,
      },
    });

    await handleSignIn({ username, password });
  };

  const handleSignUp = (data: { username: string; password: string }) => {
    return signUpMutation({
      body: {
        username: data.username,
        password: data.password,
      },
    });
  };

  const handleSignIn = async (data: { username: string; password: string }) => {
    const { data: response, error } = await signInMutation({
      body: {
        username: data.username,
        password: data.password,
      },
    });

    if (error || !response) {
      console.error(error);
      return;
    }

    const accessToken = response.access_token;

    const { id } = jwtDecode<{ id: string }>(accessToken);
    await setCookie(ACCOUNT_ID_KEY, id);
    await setCookie(ACCESS_TOKEN_KEY, response.access_token);

    router.push('/dashboard');
  };

  const [shouldSkip, setShouldSkip] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skipSignInQuery = params.get('skip-sign-in');
    setShouldSkip(skipSignInQuery === 'true');
  }, []);

  useEffect(() => {
    if (shouldSkip) {
      handleSkipSignIn();
    }
  }, [shouldSkip]);

  useEffect(() => {
    if (authenticatedData?.isSuccess) {
      router.replace('/dashboard');
    }
  }, [authenticatedData, router]);

  if (authenticationLoading || shouldSkip) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-sm">
        <AuthTabs isSignIn={isSignIn} onTabChange={setIsSignIn} />

        <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900">
          {isSignIn ? 'Sign in to your account' : 'Create a new account'}
        </h2>

        <div className="mt-8">
          {isSignIn ? (
            <SignInForm
              errorMessage={signInError?.message ?? null}
              isLoading={signInLoading}
              onSubmit={handleSignIn}
            />
          ) : (
            <SignUpForm
              isLoading={signUpLoading}
              errorMessage={signUpError?.message ?? null}
              onSubmit={handleSignUp}
            />
          )}
        </div>
      </div>
    </div>
  );
}
