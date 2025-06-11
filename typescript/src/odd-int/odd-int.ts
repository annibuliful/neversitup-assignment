export function oddInt(arr: number[]): number {
  const counts = new Map<number, number>();

  for (const num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  for (const [num, count] of counts.entries()) {
    if (count % 2 !== 0) {
      return num;
    }
  }

  return 0;
}