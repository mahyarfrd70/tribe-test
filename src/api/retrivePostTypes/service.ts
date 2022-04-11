import {PaginatedPostType} from '@tribeplatform/gql-client/types';

import cache from '@/utils/cache';
import TribeClientSingletone from '@/utils/tribeClientInstance';

export async function retrivePostTypesService(): Promise<PaginatedPostType> {
  const client = await TribeClientSingletone.getInstance();
  const postTypes = await client.posts.listPostTypes({limit: 10});

  return postTypes;
}

export default cache<PaginatedPostType>('retrive-post-type', retrivePostTypesService);
