import React from 'react';

import dynamic from 'next/dynamic';

import {Post} from '@tribeplatform/gql-client/types';

import Container from '@/components/Container';
import HTMLHeadWrapper from '@/components/HTMLHeadWrapper';
import If from '@/components/If';
import Spinner from '@/components/Spinner';
import errorMessages from '@/constants/errorMessages';
import useGetPosts from '@/hooks/useFeeds';

//load PostCard lazily
const PostCard = dynamic(() => import('@/widgets/PostCard'));

const Posts = () => {
  const {posts, isError, isFetching, isSuccess} = useGetPosts();

  return (
    <HTMLHeadWrapper title="Tribe test | Posts" description="Posts' list of community">
      <Container className="p-3 flex flex-col justify-center items-center">
        <If condition={isFetching}>
          <Spinner />
        </If>
        <If condition={isSuccess && !isFetching && !isError}>
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </If>
        <If condition={!isSuccess && !isFetching && isError}>{errorMessages.default}</If>
      </Container>
    </HTMLHeadWrapper>
  );
};

export default Posts;
