import {useJoinNetwork} from '@tribeplatform/react-sdk/hooks';
import {useCallback, useEffect, useState} from 'react';

import {useRouter} from 'next/router';

import errorMessages from '@/constants/errorMessages';

const useSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {mutateAsync, isLoading, error, isError} = useJoinNetwork({fields: 'basic'});
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      const message = error?.response?.errors?.[0].message || errorMessages.default;
      setErrorMessage(message);
    }
  }, [error, isError]);

  const signup = useCallback(
    async (input) => {
      try {
        await mutateAsync({
          input,
        });
        setErrorMessage('');
        router.push('/signin');
      } catch {}
    },
    [mutateAsync, router],
  );
  return {signup, isLoading, errorMessage};
};

export default useSignUp;
