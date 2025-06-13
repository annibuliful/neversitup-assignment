import { Fragment } from 'react';
import { ACCESS_TOKEN_KEY, ACCOUNT_ID_KEY } from '../../constant/api';
import { headers } from 'next/headers';
import { parseCookiesFromHeader } from '../../utils/cookies';
import { verifyAuthoizedAccount } from '../../api/authorization';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieHeader = (await headers()).get('cookie');
  const parseCookies = parseCookiesFromHeader(cookieHeader);
  const accountId = parseCookies[ACCOUNT_ID_KEY];
  const accessToken = parseCookies[ACCESS_TOKEN_KEY];

  if (!accessToken) {
    redirect('/');
  }

  const isVerified = await verifyAuthoizedAccount({ accessToken, accountId });

  if (!isVerified) {
    redirect('/');
  }

  return <Fragment>{children}</Fragment>;
}
