import { PrayerTimes } from "../enums/prayer-times.enum"
import { DateTypes } from "../enums/date-types.enum"

export type PrayerTimesDateTimeTimes = {
  [message in PrayerTimes | string]: string
};

type PrayerTimesDateTimeDate = {
  [message in DateTypes | string]: string
};

interface PrayersResultsDateTime {
  times: PrayerTimesDateTimeTimes
  date: PrayerTimesDateTimeDate
};

interface PrayersResultsSettings {
  timeformat: string,
  school: string,
  juristic: string,
  highlat: string,
  fajr_angle: number,
  isha_angle: number
};

interface PrayersResultsLocation {
  latitude: number,
  longitude: number,
  elevation: number,
  city: string,
  country: string,
  country_code: string,
  timezone: string,
  local_offset: number
};

interface PrayersInfoResults {
  datetime: [PrayersResultsDateTime],
  location: PrayersResultsLocation,
  settings: PrayersResultsSettings
};

export interface PrayersInfo {
  code: number,
  status: string,
  results?: PrayersInfoResults
};

/* response sample
{
    "code": 200,
    "status": "OK",
    "results": {
    "datetime": [
        {
            "times": {
                "Imsak": "03:28",
                "Sunrise": "05:29",
                "Fajr": "03:38",
                "Dhuhr": "12:43",
                "Asr": "16:39",
                "Sunset": "19:58",
                "Maghrib": "20:12",
                "Isha": "21:41",
                "Midnight": "23:48"
            },
            "date": {
            "timestamp": 1620086400,
            "gregorian": "2021-05-04",
            "hijri": "1442-09-22"
            }
        }
    ],
    "location": {
    "latitude": 43.856258392333984,
    "longitude": 18.413076400756836,
    "elevation": 499,
    "city": "Sarajevo",
    "country": "Bosnia and Herzegovina",
    "country_code": "BA",
    "timezone": "Europe/Sarajevo",
    "local_offset": 2
    },
    "settings": {
    "timeformat": "HH:mm",
    "school": "Ithna Ashari",
    "juristic": "Shafii",
    "highlat": "None",
    "fajr_angle": 18,
    "isha_angle": 17
    }
}
}
*/