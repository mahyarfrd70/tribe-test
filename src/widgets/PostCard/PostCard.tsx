import {Post} from '@tribeplatform/gql-client/types';

import Card from '@/components/Card';
import {PERMISSIONS} from '@/constants/permissions';
import usePostActions from '@/hooks/usePostActions';

const PostCard = ({post}: {post: Post}) => {
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
export default PostCard;
