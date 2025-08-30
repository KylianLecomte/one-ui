import { getPlurial } from './string.utils';

describe('getPlurial', () => {
  it("should return 's' when value is > 1", () => {
    expect(getPlurial(12)).toBe('s');
  });

  it("should return '' when value is <= 1", () => {
    expect(getPlurial(-100)).toBe('');
    expect(getPlurial(-1)).toBe('');
    expect(getPlurial(1)).toBe('');
    expect(getPlurial(0)).toBe('');
  });
});
