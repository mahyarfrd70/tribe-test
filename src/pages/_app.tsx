import {Provider as TribeProvider} from '@tribeplatform/react-sdk';
import {useCallback, useEffect, useState} from 'react';

import type {AppProps} from 'next/app';
import getConfig from 'next/config';

import Spinner from '@/components/Spinner';
import Layout from '@/layout';

import '../assets/styles/globals.css';

const {publicRuntimeConfig} = getConfig();

function MyApp({Component, pageProps}: AppProps) {
  const [accessToken, setAccessToken] = useState('');

  const generateToken = useCallback(async () => {
    const res = await fetch('/api/generate-token');
    const {accessToken} = await res.json();
    localStorage.setItem(publicRuntimeConfig.tribeAccessTokenKey, accessToken);
    setAccessToken(accessToken);
  }, []);

  useEffect(() => {
    const savedAccessToken = localStorage.getItem(publicRuntimeConfig.tribeAccessTokenKey);
    if (savedAccessToken) {
      setAccessToken(savedAccessToken);
    } else {
      generateToken();
    }
  }, []);

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
        networkDomain: process.env.NETWORK_DOMAIN,
      }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TribeProvider>
  );
}

export default MyApp;
