import type {NextApiResponse, NextApiRequest} from 'next';

import type {AccessTokenResponse} from './generateAccessToken.type';
import generateAccessTokenService from './service';

export default async function generateAccessTokenController(
  _req: NextApiRequest,
  res: NextApiResponse<AccessTokenResponse>,
) {
  const data = await generateAccessTokenService();
  res.send({accessToken: data});
}
