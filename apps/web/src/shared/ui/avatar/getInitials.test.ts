import { describe, expect, it } from 'vitest';

import { getInitials } from './getInitials';

describe('getInitials', () => {
  it.each([
    ['Ada Lovelace', 'AL'],
    ['ada', 'A'],
    ['  Grace   Brewster Hopper ', 'GH'],
    ['', ''],
  ])('%j -> %j', (name, initials) => {
    expect(getInitials(name)).toBe(initials);
  });
});
