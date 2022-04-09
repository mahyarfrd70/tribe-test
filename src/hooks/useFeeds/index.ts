import {useFeed} from '@tribeplatform/react-sdk/hooks';
import {simplifyPaginatedResult} from '@tribeplatform/react-sdk/utils';
import {useMemo} from 'react';

import {PostListOrderByEnum} from '@tribeplatform/gql-client/types';
import type {Post} from '@tribeplatform/gql-client/types';

interface useGetPosts {
  posts: Post[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const useGetPosts = () => {
  const {data, isFetching, isError, isSuccess} = useFeed({
    fields: {
      reactions: {
        fields: 'basic',
        variables: {
          limit: 10,
        },
      },
      authMemberProps: 'all',
      createdBy: {
        member: 'basic',
      },
    },
    variables: {
      limit: 10,
      orderBy: PostListOrderByEnum.CREATED_AT,
    },
  });

  const posts = useMemo(() => simplifyPaginatedResult<Post>(data).nodes, [data]);
  return {posts, isFetching, isError, isSuccess};
};

export default useGetPosts;
