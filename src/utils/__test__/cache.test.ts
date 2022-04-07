import cache from '../cache';

describe('utils > cache', () => {
  it('rejected function', async () => {
    expect.assertions(2);
    const mockFunction = jest.fn().mockImplementation(() => Promise.reject('rejected data'));
    const getMockData = cache('test', mockFunction);

    await expect(getMockData()).rejects.toMatch('rejected data');
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("cache doesn't exist", async () => {
    expect.assertions(4);
    const mockFunction = jest.fn().mockImplementation(() => Promise.resolve('test response'));
    const getMockData = cache('test', mockFunction);

    // first call
    await expect(getMockData()).resolves.toBe('test response');
    expect(mockFunction).toHaveBeenCalledTimes(1);
    // second call
    await expect(getMockData()).resolves.toBe('test response');
    // after second call the callback function won't be called.
    // because tha data has been read from cache,
    // so the mockFunction has just been called once on the first call.
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
