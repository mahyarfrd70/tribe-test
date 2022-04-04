import {Provider as TribeProvider} from '@tribeplatform/react-sdk';
import {useEffect, useState} from 'react';

import type {AppProps} from 'next/app';
import getConfig from 'next/config';

import Spinner from '@/components/Spinner';

import '../assets/styles/globals.css';

const {publicRuntimeConfig} = getConfig();

function MyApp({Component, pageProps}: AppProps) {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    async function generateToken() {
      const res = await fetch('/api/generate-token');
      const {accessToken} = await res.json();
      setAccessToken(accessToken);
    }
    if (!accessToken) {
      generateToken();
    }
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <TribeProvider
      config={{
        accessToken,
        baseUrl: publicRuntimeConfig.tribeGQLHost,
      }}
    >
      <Component {...pageProps} />
    </TribeProvider>
  );
}

export default MyApp;
