import axios from 'axios';
import { PrayersInfo } from '../models/prayers-info.model';
import * as logger from './logger.service';
import { PrayerTimes } from '../enums/prayer-times.enum';
import { getPrayerTimesFromCache, savePrayerTimesToCache } from './redis.service';
import { LogIndentation } from '../enums/log-indentation.enum';

const prayersAPI = 'https://api.pray.zone/v2/times/today.json?city=';

const getPrayersInfo = (city: string = 'sarajevo'): Promise<any> => {
  return axios.get(`${prayersAPI}${city}`);
}

export const getPrayerTimes = async (selectedTime: PrayerTimes, city: string = 'Sarajevo') => {
  try {

    const cachedData = await getPrayerTimesFromCache(city);

    if (cachedData) {
      logger.debug({ message: 'serving data from cache', payload: { city, data: JSON.parse(cachedData) } }, LogIndentation.Small);
      return JSON.parse(cachedData)[selectedTime];
    }

    const prayerTimesCollection = await getPrayerTimesFromAPI(city);

    if (prayerTimesCollection && prayerTimesCollection[selectedTime]) {
      logger.debug({ message: 'saving data to cache', payload: { city, data: prayerTimesCollection } }, LogIndentation.Small);
      savePrayerTimesToCache(city, prayerTimesCollection);
      return prayerTimesCollection[selectedTime];
    }

  } catch (e) {
    logger.error({ message: 'Unable to retrieve prayer times', payload: e });
  }
}


const getPrayerTimesFromAPI = async (city: string = 'sarajevo') => {
  try {

    const APIData = await getPrayersInfo(city);
    const prayersInfo = APIData.data as PrayersInfo;

    if (prayersInfo && prayersInfo.results && prayersInfo.results.datetime && prayersInfo.results.datetime.length) {
      const dateTime = prayersInfo.results.datetime[0];

      if (dateTime.times) {
        return dateTime.times;
      }

    }

    return null;

  } catch (e) {
    logger.error({ message: 'Unable to retrieve prayer times', payload: e });
  }
}
