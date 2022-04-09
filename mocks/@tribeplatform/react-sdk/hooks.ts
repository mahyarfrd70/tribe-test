const hookMocks = {
  useAuthMember: jest
    .fn()
    .mockReturnValueOnce({data: {email: 'test', id: 'id', name: 'mahyar'}})
    .mockReturnValueOnce({data: {}}),
};

export default hookMocks;
