import LRUCache from 'lru-cache';
import type {Options} from 'lru-cache';

const cacheOptions: Options<unknown, unknown> = {
  updateAgeOnGet: true,
  ttl: 60 * 60 * 1000,
};

export default function cache<T>(key: string, fn: () => Promise<T>) {
  const cache = new LRUCache(cacheOptions);
  return async (): Promise<T> => {
    const cachedData: T | undefined = cache.get(key);

    if (cachedData) return cachedData;
    try {
      const data = await fn();
      cache.set(key, data);
      return data;
    } catch (err) {
      throw err;
    }
  };
}
