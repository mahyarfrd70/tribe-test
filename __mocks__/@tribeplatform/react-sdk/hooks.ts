export const useAuthMember = jest
  .fn()
  .mockReturnValueOnce({data: {email: 'test', name: 'mahyar fard', role: {id: 'id'}}})
  .mockReturnValueOnce({data: {}});
