import LRUCache from 'lru-cache';
import {Options} from 'lru-cache';

const cacheOptions: Options<unknown, unknown> = {
  updateAgeOnGet: true,
  ttl: 60 * 60 * 1000,
};

export default function cache<T>(key: string, fn: () => Promise<T>) {
  return async (): Promise<T> => {
    const cache = new LRUCache(cacheOptions);
    const cachedData: T | undefined = cache.get(key);

    if (cachedData) return cachedData;
    try {
      const data = await fn();
      cache.set(key, data);
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  };
}
