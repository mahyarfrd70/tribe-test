import {useAuthMember} from '@tribeplatform/react-sdk/hooks';
import {useMemo} from 'react';

const useAuth = () => {
  const {data: user} = useAuthMember();

  const isLoggedIn = useMemo(() => {
    return Boolean(user?.email && user?.role?.id);
  }, [user]);

  return {isLoggedIn, user};
};

export default useAuth;
