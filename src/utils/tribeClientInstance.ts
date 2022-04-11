import getConfig from 'next/config';

import {TribeClient} from '@tribeplatform/gql-client';

const {CLIENT_ID, CLIENT_SECRET, NETWORK_ID, MEMBER_ID} = process.env;
const {publicRuntimeConfig} = getConfig();

class TribeClientSingletone {
  private static instance: TribeClient;
  private static token?: string;

  public static async generateToken() {
    const client = new TribeClient({
      clientId: CLIENT_ID as string,
      clientSecret: CLIENT_SECRET as string,
      graphqlUrl: publicRuntimeConfig.tribeGQLHost,
    });

    const accessToken = await client.generateToken({
      networkId: NETWORK_ID as string,
      memberId: MEMBER_ID,
    });
    TribeClientSingletone.setToken(accessToken);
    return accessToken;
  }

  public static async getInstance(): Promise<TribeClient> {
    if (!TribeClientSingletone.instance) {
      if (!TribeClientSingletone.token) {
        await TribeClientSingletone.generateToken();
      }
      TribeClientSingletone.instance = new TribeClient({
        graphqlUrl: publicRuntimeConfig.tribeGQLHost,
        accessToken: TribeClientSingletone.token,
      });
    }
    return TribeClientSingletone.instance;
  }
  private static setToken(token: string) {
    TribeClientSingletone.token = token;
  }
}

export default TribeClientSingletone;
