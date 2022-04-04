import getConfig from 'next/config';

import {TribeClient} from '@tribeplatform/gql-client';

import cache from '@/utils/cache';

const {CLIENT_ID, CLIENT_SECRET, NETWORK_ID, MEMBER_ID} = process.env;
const {publicRuntimeConfig} = getConfig();

function getAccessTokenServiceCacheKey() {
  return `generate-token/${CLIENT_ID}/${CLIENT_SECRET}/${NETWORK_ID}${MEMBER_ID ? `/${MEMBER_ID}` : ''}`;
}

export async function generateAccessTokenService() {
  const client = new TribeClient({
    clientId: CLIENT_ID as string,
    clientSecret: CLIENT_SECRET as string,
    graphqlUrl: publicRuntimeConfig.tribeGQLHost,
  });
  const accessToken = await client.generateToken({
    networkId: NETWORK_ID as string,
    memberId: MEMBER_ID,
  });

  return accessToken;
}

export default cache(getAccessTokenServiceCacheKey(), generateAccessTokenService);
