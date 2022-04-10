interface TribeCredentials {
  clientId: string;
  clientSecret: string;
  graphqlUrl: string;
  networkId: string;
  memberId: string | undefined;
}

type TribeClientInstanceInput = Omit<TribeCredentials, 'networkId' | 'memberId'>;
type GenerateTokenArgs = Pick<TribeCredentials, 'networkId' | 'memberId'>;

export function TribeClient({clientId, clientSecret, graphqlUrl}: TribeClientInstanceInput) {
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
}

export const hasScopesPermission = jest.fn().mockImplementation((_post, permissions) => permissions.map(() => true));
