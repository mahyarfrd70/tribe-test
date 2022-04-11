import LRUCache from 'lru-cache';
import type {Options} from 'lru-cache';

const {CLIENT_ID, CLIENT_SECRET, NETWORK_ID, MEMBER_ID} = process.env;

const cacheOptions: Options<unknown, unknown> = {
  updateAgeOnGet: true,
  ttl: 60 * 60 * 1000,
};

function generateCacheKey(cacheName: string) {
  return `${cacheName}/${CLIENT_ID}/${CLIENT_SECRET}/${NETWORK_ID}${MEMBER_ID ? `/${MEMBER_ID}` : ''}`;
}

export default function cache<T>(key: string, fn: () => Promise<T>) {
  const cache = new LRUCache(cacheOptions);
  return async (): Promise<T> => {
    const cacheKey = generateCacheKey(key);
    const cachedData: T | undefined = cache.get(cacheKey);

    if (cachedData) return cachedData;
    try {
      const data = await fn();
      cache.set(cacheKey, data);
      return data;
    } catch (err) {
      throw err;
    }
  };
}
