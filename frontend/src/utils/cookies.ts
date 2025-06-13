export function parseCookiesFromHeader(
  cookieHeader: string | null
): Record<string, string> {
  if (!cookieHeader) return {};

  return Object.fromEntries(
    cookieHeader.split(';').map((part) => {
      const [key, ...val] = part.trim().split('=');
      return [key, decodeURIComponent(val.join('='))];
    })
  );
}
