import { smiley } from './smiley';

describe('smiley', () => {
  const testCases = [
    {
      name: 'All valid smileys',
      input: [':)', ':D', ';-D', ':~)'],
      expected: 4,
    },
    {
      name: 'All invalid smileys',
      input: [';(', ':>', ':}', ':]'],
      expected: 0,
    },
    {
      name: 'Mixed valid and invalid smileys',
      input: [':)', ';(', ':~D', ':}', ':)'],
      expected: 3,
    },
    {
      name: 'Only short smileys',
      input: [':)', ':D', ';)'],
      expected: 3,
    },
    {
      name: 'Only long smileys',
      input: [':-)', ';~D', ':-D'],
      expected: 3,
    },
    {
      name: 'Empty input',
      input: [],
      expected: 0,
    },
    {
      name: 'Smileys with invalid characters',
      input: [':*)', ';~]', ':--D'],
      expected: 0,
    },
    {
      name: 'Smileys with incorrect order',
      input: ['D:)', ')~:', '~-;'],
      expected: 0,
    },
    {
      name: 'Edge case with similar valid formats',
      input: [':)', ';)', ':~D', ';-D'],
      expected: 4,
    },
  ];

  testCases.forEach(({ name, input, expected }) => {
    it(name, () => {
      expect(smiley(input)).toBe(expected);
    });
  });
});
