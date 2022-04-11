import type {NextApiResponse, NextApiRequest} from 'next';

import type {PostTypesResponse} from './retrivePostTypes.type';
import retrivePostTypesService from './service';

export default async function retrivePostTypesController(
  _req: NextApiRequest,
  res: NextApiResponse<PostTypesResponse>,
) {
  const data = await retrivePostTypesService();
  res.send({data});
}
