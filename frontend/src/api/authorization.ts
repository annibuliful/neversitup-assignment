type VerifyAuthorizedAccountParams = {
  accessToken: string;
  accountId: string;
};

export async function verifyAuthoizedAccount({
  accessToken,
  accountId,
}: VerifyAuthorizedAccountParams) {
  try {
    const httpResponse = await fetch(
      `${process.env.API_ENDPOINT}/users/${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const response = await httpResponse.json();

    if (response.isSuccess && response.data.id === accountId) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('[verify-authoized-account]: ', error);
    return false;
  }
}
