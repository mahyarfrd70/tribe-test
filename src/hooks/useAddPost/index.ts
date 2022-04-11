import {useSpaces, useAddPost as useAddPostTribeHook} from '@tribeplatform/react-sdk/hooks';
import {simplifyPaginatedResult} from '@tribeplatform/react-sdk/utils';
import {useCallback, useEffect, useMemo} from 'react';

import {useRouter} from 'next/router';

import {PostMappingTypeEnum, Space} from '@tribeplatform/gql-client/types';

import POST_TYPE_NAMES from '@/constants/postTypeName';
import SPACE_NAMES from '@/constants/spaceNames';

import usePostTypes from '../usePostTypes';

export interface AddPostArgs {
  title: string;
  body: string;
}

function getAddPostArg(title: string, body: string, generalSpaceId: string, discussionPostType: string) {
  return {
    spaceId: generalSpaceId,
    input: {
      postTypeId: discussionPostType,
      publish: true,
      mappingFields: [
        {
          key: 'title',
          type: PostMappingTypeEnum.TEXT,
          value: JSON.stringify(title),
        },
        {
          key: 'content',
          type: PostMappingTypeEnum.HTML,
          value: JSON.stringify(body),
        },
      ],
    },
  };
}

const useAddPost = () => {
  const router = useRouter();
  const {data, isFetching: isSpacesFetching} = useSpaces();
  const {postTypes, isFetching: isPostTypesFetching} = usePostTypes();
  const {mutateAsync, isLoading, isError, isSuccess} = useAddPostTribeHook();

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      router.push('/');
    }
  }, [isSuccess, isError, isLoading]);

  const generalSpaceId = useMemo(() => {
    const spaces = simplifyPaginatedResult<Space>(data).nodes;
    const generalSpace = spaces.find((item) => item.name.toLowerCase() === SPACE_NAMES.GENERAL);
    return generalSpace?.id;
  }, [data]);

  const discussionPostTypeId = useMemo(() => {
    const discussionPostType = postTypes?.find((item) => item.name.toLowerCase() === POST_TYPE_NAMES.DiISCUSSION);
    return discussionPostType?.id;
  }, [postTypes]);

  const addPost = useCallback(
    async ({title, body}: AddPostArgs) => {
      if (generalSpaceId && !isSpacesFetching && !isPostTypesFetching && discussionPostTypeId) {
        await mutateAsync(getAddPostArg(title, body, generalSpaceId, discussionPostTypeId));
      }
    },
    [generalSpaceId, discussionPostTypeId, isSpacesFetching, isPostTypesFetching],
  );

  return {addPost, isLoading, isError};
};

export default useAddPost;
