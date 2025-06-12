'use client';

import { useState } from 'react';
import { SignInForm } from '../components/form/SignInForm';
import { SignUpForm } from '../components/form/SignUpForm';
import { AuthTabs } from '../components/elements/AuthTabs';
import { useApiMutation } from '../hooks/useApiMutation';
import { setCookie } from 'cookies-next';
import { ACCESS_ID_KEY, ACCESS_TOKEN_KEY } from '../constant/api';
import { jwtDecode } from 'jwt-decode';

export default function Page() {
  const [isSignIn, setIsSignIn] = useState(true);

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

  const handleSignUp = (data: { username: string; password: string }) => {
    signUpMutation({
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
    setCookie(ACCESS_ID_KEY, id);
    setCookie(ACCESS_TOKEN_KEY, response.access_token);
  };

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
