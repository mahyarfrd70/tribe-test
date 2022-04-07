import generateAccessTokenController from '../controller';
import {generateAccessTokenService} from '../service';

interface TribeCredentials {
  clientId: string;
  clientSecret: string;
  graphqlUrl: string;
  networkId: string;
  memberId: string | undefined;
}

type TribeClientInstanceInput = Omit<TribeCredentials, 'networkId' | 'memberId'>;
type GenerateTokenArgs = Pick<TribeCredentials, 'networkId' | 'memberId'>;

jest.mock('@tribeplatform/gql-client', () => {
  return {
    __esModule: true,
    TribeClient: function ({clientId, clientSecret, graphqlUrl}: TribeClientInstanceInput) {
      return {
        generateToken: jest.fn().mockImplementation(({networkId, memberId}: GenerateTokenArgs) => {
          if (clientId && clientSecret && graphqlUrl && networkId) {
            return Promise.resolve(
              `${clientId}/${clientSecret}/${graphqlUrl}/${networkId}${memberId ? `/${memberId}` : ''}`,
            );
          }
          return Promise.resolve('error');
        }),
      };
    },
  };
});

jest.mock('next/config', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({publicRuntimeConfig: {tribeGQLHost: 'graphqlURL'}})),
  };
});

describe('generateAccessToken', () => {
  it('service', async () => {
    expect.assertions(1);
    await expect(generateAccessTokenService()).resolves.toBe('clientId/clientSecret/graphqlURL/networkId');
  });

  it('controller', async () => {
    expect.assertions(2);
    const res = {
      send: jest.fn(),
    };
    await generateAccessTokenController({} as any, res as any);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({accessToken: 'clientId/clientSecret/graphqlURL/networkId'});
  });
});
