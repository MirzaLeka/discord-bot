import redis from 'redis';
import * as logger from './logger.service';
import { ClientEvents } from '../enums/client-events.enum';
import { PrayerTimesDateTimeTimes } from '../models/prayers-info.model';
import { promisify } from 'util';

// weird TS rules :(
const REDIS_PORT = Number(process.env.REDIS_PORT);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? '12345';
const { REDIS_HOST } = process.env;


const redisClient = redis.createClient(
  REDIS_PORT,
  REDIS_HOST
);
redisClient.auth(REDIS_PASSWORD);


redisClient.on(ClientEvents.Connect, () => {
  logger.info({ message: 'Redis Client connected to redis...' });
});

redisClient.on(ClientEvents.Ready, () => {
  logger.info({ message: 'Redis Client connected to redis and ready to use...' });
});

redisClient.on(ClientEvents.Error, (err) => {
  logger.error({ message: 'Redis Client error', payload: err.message });
});

redisClient.on(ClientEvents.End, () => {
  logger.warn({ message: 'Redis Client disconnected' });
});

process.on(ClientEvents.SIGINT, () => {
  logger.warn({ message: 'Redis Client is shutting down' });
  redisClient.quit();
});


export const savePrayerTimesToCache = (key: string, value: PrayerTimesDateTimeTimes, expiry: number = 12) => {
  redisClient.set(key, JSON.stringify(value), 'EX', 60 * 60 * expiry); // 12h
};

export const getPrayerTimesFromCache = async (key: string): Promise<string> => {
  // redisClient.get = promisify(redisClient.get) as any; // turn redis client into promise
  // return redisClient.get(key);

  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
        if (err) {
          logger.error({ message: 'Redis Client get cached key error', payload: err.message });
          reject(err);
        }
        data = data ?? '';
        resolve(data);
        // return data && JSON.parse(data);
     });
    })

}

  // return redisClient.get(key, (err, data) => {
  //   if (err) {
  //     console.log('err :>> ', err);
  //     logger.error({ message: 'Redis Client get cached key error', payload: err.message });
  //   }
  //   console.log('data :>> ', data);
  //   return data && JSON.parse(data);
  // });
// };

// clears all cache. use with caution
export const clearCache = () => redisClient.flushall();

// preview in browser,
//   npm i -g redis-commander
//   type redis-commander in cmd
//   open localhost
//   add your server connection
