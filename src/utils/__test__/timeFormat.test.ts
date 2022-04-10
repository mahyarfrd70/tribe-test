import {formatISO, subDays} from 'date-fns';

import {getDistance} from '../timeFormat';

describe('utils > timeFormat', () => {
  it('getDistance', () => {
    const date = formatISO(subDays(new Date(), 5));
    expect(getDistance(date)).toBe('5 days ago');
  });
});
