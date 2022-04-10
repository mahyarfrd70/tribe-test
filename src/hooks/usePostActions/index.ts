import {useAddReaction, useDeletePost, useRemoveReaction} from '@tribeplatform/react-sdk/hooks';
import {useCallback, useMemo} from 'react';

import {useRouter} from 'next/router';

import {hasScopesPermission} from '@tribeplatform/gql-client';
import type {Post} from '@tribeplatform/gql-client/types';

import {PERMISSIONS} from '@/constants/permissions';

import useAuth from '../useAuth';

const usePostActions = (post: Post) => {
  const router = useRouter();
  const {mutate: upvote} = useAddReaction();
  const {mutate: downvote} = useRemoveReaction();
  const {mutate: deleteItem} = useDeletePost();
  const {isLoggedIn} = useAuth();

  const reacted = useMemo(
    () => post?.reactions?.some((reaction) => reaction.reacted && reaction.reaction === '+1'),
    [post],
  );

  const getActionPermission = useCallback(
    (permissions: Array<PERMISSIONS>): boolean[] => {
      if (!isLoggedIn) return permissions.map(() => false);
      const permissionList = hasScopesPermission(post, permissions);
      return permissionList;
    },
    [isLoggedIn, post],
  );

  const toggleReaction = useCallback(() => {
    if (!isLoggedIn) return router.push('/signin');
    reacted
      ? downvote({
          postId: post?.id,
          reaction: '+1',
        })
      : upvote({
          postId: post?.id,
          input: {
            reaction: '+1',
          },
        });
  }, [isLoggedIn, post, reacted]);

  const deletePost = useCallback(() => {
    deleteItem({
      id: post.id,
    });
  }, [post]);

  return {toggleReaction, reacted, deletePost, getActionPermission};
};

export default usePostActions;
