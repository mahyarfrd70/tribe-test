import cache from '@/utils/cache';
import TribeClientSingletone from '@/utils/tribeClientInstance';

export async function generateAccessTokenService() {
  const accessToken = await TribeClientSingletone.generateToken();
  return accessToken;
}

export default cache<string>('generate-token', generateAccessTokenService);
