import {renderHook, act} from '@testing-library/react-hooks';

import useLogout from '..';

describe('hooks > useLogout', () => {
  it('call logout', () => {
    const spyStorage = jest.spyOn(localStorage.__proto__, 'removeItem');
    const {result} = renderHook(useLogout);
    act(result.current.logout);
    expect(spyStorage).toHaveBeenCalledTimes(1);
    expect(spyStorage).toHaveBeenCalledWith('tribe-access-token');

    spyStorage.mockRestore();
  });
});
