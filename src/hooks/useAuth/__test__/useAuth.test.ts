import {renderHook} from '@testing-library/react-hooks';

import useAuth from '..';

describe('hooks > useAuth', () => {
  //these tests heas been written based on the useAuthMember mock and the order of test has not to be changed
  it('isLoggedIn true', () => {
    const {result} = renderHook(useAuth);
    expect(result.current.isFetching).toBeFalsy();
    expect(result.current.isLoggedIn).toBeTruthy();
    expect(result.current.user).toStrictEqual({email: 'test', name: 'mahyar fard', role: {id: 'id'}});
  });
  it('isLoggedIn false', () => {
    const {result} = renderHook(useAuth);
    expect(result.current.isFetching).toBeFalsy();
    expect(result.current.isLoggedIn).toBeFalsy();
    expect(result.current.user).toBeNull();
  });
  it('isFetching true', () => {
    const {result} = renderHook(useAuth);
    expect(result.current.isFetching).toBeTruthy();
    expect(result.current.isLoggedIn).toBeFalsy();
    expect(result.current.user).toBeNull();
  });
});
