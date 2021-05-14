import { BotCommands } from "../enums/bot-commands.enum";
import { PrayerTimes } from "../enums/prayer-times.enum";

export type PrayersCollection = {
  [command in BotCommands | string]: PrayerTimes
}

export const getPrayerFromBotCmd = () => {

  const prayersCollection: PrayersCollection = {
    [BotCommands.Imsak]: PrayerTimes.Imsak,
    [BotCommands.Sunrise]: PrayerTimes.Sunrise,
    [BotCommands.Fajr]: PrayerTimes.Fajr,
    [BotCommands.Dhuhr]: PrayerTimes.Dhuhr,
    [BotCommands.Asr]: PrayerTimes.Asr,
    [BotCommands.Iftar]: PrayerTimes.Iftar,
    [BotCommands.Maghrib]: PrayerTimes.Maghrib,
    [BotCommands.Isha]: PrayerTimes.Isha,
    [BotCommands.Midnight]: PrayerTimes.Midnight,
  }

  return prayersCollection;
}
