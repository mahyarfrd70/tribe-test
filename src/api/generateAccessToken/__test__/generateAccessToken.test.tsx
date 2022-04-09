import generateAccessTokenController from '../controller';
import {generateAccessTokenService} from '../service';

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
