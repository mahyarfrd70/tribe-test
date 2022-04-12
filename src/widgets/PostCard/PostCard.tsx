import {memo} from 'react';

import Card from '@/components/Card';
import {PERMISSIONS} from '@/constants/permissions';
import usePostActions from '@/hooks/usePostActions';

import {PostCardProps} from './PostCard.type';

const PostCard = ({post}: PostCardProps) => {
  const {reacted, getActionPermission, deletePost, toggleReaction} = usePostActions(post);
  const [canDelete] = getActionPermission([PERMISSIONS.DELETE_POST]);

  return (
    <Card
      key={post.id}
      reacted={reacted as boolean}
      title={post.title as string}
      body={post.shortContent as string}
      name={post.createdBy?.member?.name as string}
      createdAt={post.createdAt}
      commentsCount={post.repliesCount}
      likesCount={post.reactionsCount}
      hasDeletePermission={canDelete}
      onDeletePost={deletePost}
      onReact={toggleReaction}
    />
  );
};
export default memo(PostCard);
