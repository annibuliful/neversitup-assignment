export function randomString(length: number): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * charset.length);
    result += charset[randIndex];
  }

  return result;
}
