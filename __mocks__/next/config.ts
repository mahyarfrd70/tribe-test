export default jest.fn().mockReturnValue({
  publicRuntimeConfig: {
    tribeGQLHost: 'graphqlURL',
    tribeAccessTokenKey: 'tribe-access-token',
  },
});
