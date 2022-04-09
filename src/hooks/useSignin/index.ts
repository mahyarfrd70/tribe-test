import {useLogin} from '@tribeplatform/react-sdk/hooks';
import {useCallback, useState} from 'react';

import getConfig from 'next/config';

import errorMessages from '@/constants/errorMessages';

export interface LoginValues {
  email: string;
  password: string;
}

const {
  publicRuntimeConfig: {tribeAccessTokenKey},
} = getConfig();

const useSignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {login, isLoading} = useLogin();

  const signin = useCallback(
    async ({email, password}: LoginValues) => {
      try {
        const token = await login({
          variables: {input: {usernameOrEmail: email, password}},
        });
        localStorage.setItem(tribeAccessTokenKey, token.accessToken);
        window.location.href = '/';
      } catch (error: any) {
        const message = error?.response?.errors?.[0].message || errorMessages.default;
        setErrorMessage(message);
      }
    },
    [login],
  );
  return {signin, isLoading, errorMessage};
};

export default useSignIn;
