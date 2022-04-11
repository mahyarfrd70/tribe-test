import React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import {Post} from '@tribeplatform/gql-client/types';

import Button from '@/components/Button';
import Container from '@/components/Container';
import HTMLHeadWrapper from '@/components/HTMLHeadWrapper';
import If from '@/components/If';
import Spinner from '@/components/Spinner';
import errorMessages from '@/constants/errorMessages';
import useAuth from '@/hooks/useAuth';
import useGetPosts from '@/hooks/useFeeds';

//load PostCard lazily
const PostCard = dynamic(() => import('@/widgets/PostCard'));

const Posts = () => {
  const {posts, isError, isFetching, isSuccess} = useGetPosts();
  const {isLoggedIn} = useAuth();
  return (
    <HTMLHeadWrapper title="Tribe test | Posts" description="Posts' list of community">
      <Container className="p-3 flex flex-col justify-center items-center">
        <If condition={isFetching}>
          <Spinner />
        </If>
        <If condition={isSuccess && !isFetching && !isError && Boolean(posts.length)}>
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </If>
        <If condition={isSuccess && !isFetching && !isError && !Boolean(posts.length)}>
          <div className="flex justify-center items-center flex-col pt-6">
            <p className="mb-3">
              There is no post. please create a new one. {!isLoggedIn && 'you need to be loggedin to create a post.'}
            </p>
            <If condition={isLoggedIn}>
              <Link href="/add-post" passHref>
                <Button>Add post</Button>
              </Link>
            </If>
            <If condition={!isLoggedIn}>
              <Link href="/signin" passHref>
                <Button>Sign in</Button>
              </Link>
            </If>
          </div>
        </If>
        <If condition={!isSuccess && !isFetching && isError}>{errorMessages.default}</If>
      </Container>
    </HTMLHeadWrapper>
  );
};

export default Posts;
