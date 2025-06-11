import { manipulate } from './manipulate';

describe('manipulate', () => {
  it('should handle single character', () => {
    expect(manipulate('a')).toEqual(['a']);
  });

  it('should handle two distinct characters', () => {
    expect(manipulate('ab')).toEqual(['ab', 'ba']);
  });

  it('should handle three distinct characters', () => {
    expect(manipulate('abc')).toEqual([
      'abc',
      'acb',
      'bac',
      'bca',
      'cab',
      'cba',
    ]);
  });

  it('should handle four characters with duplicates', () => {
    expect(manipulate('aabb')).toEqual([
      'aabb',
      'abab',
      'abba',
      'baab',
      'baba',
      'bbaa',
    ]);
  });
});
