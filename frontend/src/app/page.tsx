'use client';

import { useState } from 'react';
import { SignInForm } from '../components/form/SignInForm';
import { SignUpForm } from '../components/form/SignUpForm';
import { AuthTabs } from '../components/elements/AuthTabs';

export default function Page() {
  const [isSignIn, setIsSignIn] = useState(true);

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
              onSubmit={(data: { username: string; password: string }) => {
                console.log('sign-in', data);
              }}
            />
          ) : (
            <SignUpForm
              onSubmit={(data: { username: string; password: string }) => {
                console.log('sign-up', data);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
