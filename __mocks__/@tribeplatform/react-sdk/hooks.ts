import {
  MutationAddReactionArgs,
  MutationDeletePostArgs,
  MutationRemoveReactionArgs,
} from '@tribeplatform/gql-client/types';

import feeds from '@/mocks/posts.json';

export const useAuthMember = jest
  .fn()
  .mockReturnValueOnce({isFetching: false, data: {email: 'test', name: 'mahyar fard', role: {id: 'id'}}})
  .mockReturnValueOnce({isFetching: false, data: null})
  .mockReturnValueOnce({isFetching: true, data: null});

export const useFeed = jest
  .fn()
  .mockReturnValueOnce({isFetching: true, data: null, isError: false, isSuccess: false})
  .mockReturnValueOnce({isFetching: false, data: null, isError: true, isSuccess: false})
  .mockReturnValueOnce({isFetching: false, data: feeds, isError: false, isSuccess: true});

export const useAddReaction = jest.fn().mockReturnValue({
  mutate: jest.fn().mockImplementation((input: MutationAddReactionArgs) => (input.postId ? true : false)),
});
export const useRemoveReaction = jest.fn().mockReturnValue({
  mutate: jest.fn().mockImplementation((input: MutationRemoveReactionArgs) => (input.postId ? true : false)),
});
export const useDeletePost = jest.fn().mockReturnValue({
  mutate: jest.fn().mockImplementation((input: MutationDeletePostArgs) => (input.id ? true : false)),
});
