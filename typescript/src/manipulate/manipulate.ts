export function manipulate(text: string): string[] {
  const result: string[] = [];
  const chars = [...text];

  function permutations(index: number, arr: string[]): void {
    if (index === arr.length - 1) {
      result.push(arr.join(''));
      return;
    }

    const seen = new Set<string>();

    for (let i = index; i < arr.length; i++) {
      if (seen.has(arr[i])) continue;
      seen.add(arr[i]);

      // swap
      [arr[index], arr[i]] = [arr[i], arr[index]];
      permutations(index + 1, arr);
      [arr[index], arr[i]] = [arr[i], arr[index]];
    }
  }

  permutations(0, chars);
  result.sort();
  return result;
}
