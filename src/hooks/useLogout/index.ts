import {useCallback} from 'react';

import getConfig from 'next/config';

const {
  publicRuntimeConfig: {tribeAccessTokenKey},
} = getConfig();

interface UseLogout {
  logout: () => void;
}

const useLogout = (): UseLogout => {
  const logout = useCallback(() => {
    localStorage.removeItem(tribeAccessTokenKey);
    window.location.href = '/';
  }, []);

  return {logout};
};
export default useLogout;
