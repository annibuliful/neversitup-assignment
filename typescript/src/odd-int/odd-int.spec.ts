import { oddInt } from './odd-int';

describe('oddInt', () => {
  const testCases: { input: number[]; expected: number }[] = [
    { input: [7], expected: 7 },
    { input: [0], expected: 0 },
    { input: [1, 1, 2], expected: 2 },
    { input: [0, 1, 0, 1, 0], expected: 0 },
    { input: [1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1], expected: 4 },
  ];

  testCases.forEach(({ input, expected }, index) => {
    it(`Test case ${index + 1}`, () => {
      expect(oddInt(input)).toBe(expected);
    });
  });
});
