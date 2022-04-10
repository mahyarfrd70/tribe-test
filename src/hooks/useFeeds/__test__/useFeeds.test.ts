import {renderHook} from '@testing-library/react-hooks';

import useFeeds from '..';

describe('hooks > useFeeds', () => {
  //these tests heas been written based on the useFeeds mock and the order of test has not to be changed
  it('fetching', () => {
    const {result} = renderHook(useFeeds);
    expect(result.current.isFetching).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isSuccess).toBeFalsy();
    expect(result.current.posts).toBeNull();
  });
  it('throw error', () => {
    const {result} = renderHook(useFeeds);
    expect(result.current.isFetching).toBeFalsy();
    expect(result.current.isError).toBeTruthy();
    expect(result.current.isSuccess).toBeFalsy();
    expect(result.current.posts).toBeNull();
  });
  it('get result', () => {
    const {result} = renderHook(useFeeds);
    expect(result.current.isFetching).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.posts).toHaveLength(1);
  });
});
