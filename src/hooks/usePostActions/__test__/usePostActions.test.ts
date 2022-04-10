import {renderHook, act} from '@testing-library/react-hooks';

import {PERMISSIONS} from '@/constants/permissions';
import posts from '@/mocks/posts.json';

import usePostActions from '..';

describe('hooks > usePostActions', () => {
  const post: any = posts[0];
  it('loggedin', () => {
    const {result} = renderHook(() => usePostActions(post));
    act(() => {
      const permissions = result.current.getActionPermission([PERMISSIONS.DELETE_POST]);
      expect(permissions).toStrictEqual([true]);
    });
    expect(result.current.reacted).toBeTruthy();
  });
  it('not loggedin', () => {
    const {result} = renderHook(() => usePostActions(post));
    act(() => {
      const permissions = result.current.getActionPermission([PERMISSIONS.DELETE_POST]);
      expect(permissions).toStrictEqual([false]);
    });
    expect(result.current.reacted).toBeTruthy();
  });
});
