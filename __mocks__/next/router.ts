export const useRouter = jest.fn().mockImplementation(() => ({
  push: jest.fn(),
}));
