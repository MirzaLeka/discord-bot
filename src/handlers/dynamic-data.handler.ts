import { BotCommands } from "../enums/bot-commands.enum";
import { ResponseMMessageDetails } from "../models/response-message.model";
import { Message } from "discord.js";
import { getPrayerTimes } from "../services/prayers.service";
import { capitalize } from "../utils/capitilize";
import { Colors } from "../enums/colors.enum";
import { getPrayerFromBotCmd } from "../models/bot-cmd-to-prayer.model";
import { SpecialCharacters } from "../enums/special-chars.enum";

const handlePrayerAPIData = async (command: BotCommands | string, response: ResponseMMessageDetails, city: string = 'Sarajevo') => {

  if (response && response.embeds) {

    // convert bot cmmand !iftar to Prayer times !iftar
    const convertedCmd = getPrayerFromBotCmd()[command];
    city = capitalize(city);

    const prayerTime = await getPrayerTimes(convertedCmd, city);

    if (!prayerTime) {
      response.embeds.title = 'Invalid entry';
      response.embeds.description = 'Please try another city.'
      response.embeds.color = Colors.Orange;
      return response;
    }

    response.embeds.title = `${city} ${command.substring(1)} time`;
    response.embeds.description = prayerTime;
  }
  return response;
}

// how number should have been extracted string => guid.match(/\d+/)[0]; thanks TS
const extractUserIdFromGuid = (guid: string):string => {
  return guid && guid.slice(3, -1); // e.g.guid <@!12345> => 12345
}


const handleWelcomeOrWarn = (command: BotCommands | string, response: ResponseMMessageDetails, dynamicData: string, messageEmitter: Message): ResponseMMessageDetails => {

  // if you typed !warn and nothing after that
  // or you typed guid but you didn't mention any user, e.g. <@!0007 (invalid guid)
  // return generic warm or welcome msg
  if (!dynamicData || !dynamicData.startsWith(SpecialCharacters.UserGuid) || !messageEmitter.mentions.users.size) {
    return response;
  }

  const userId = extractUserIdFromGuid(dynamicData);
  const foundUser = messageEmitter.mentions.members?.first()?.user;

  // compare first mentioned user with user id you passed
  if (!foundUser || foundUser.id !== userId) {
    return response;
  }

  if (response && response.embeds) {

    if (command === BotCommands.Welcome) {;
      response.embeds.description = `Everyone, @${foundUser.username} has arrived!`;
    } else {
      response.embeds.title = `@${foundUser.username} behave yourself❗`;
    }
  }

  return response;
}


export const getDynamicResponse = async (botCommand: BotCommands | string, response: ResponseMMessageDetails, messageEmitter: Message) => {

  const [ command, dynamicData ] = botCommand.split(' ');

  switch(command) {
    case BotCommands.Welcome:
    case BotCommands.Warn:
      return handleWelcomeOrWarn(command, response, dynamicData, messageEmitter);
    case BotCommands.Imsak:
    case BotCommands.Sunrise:
    case BotCommands.Fajr:
    case BotCommands.Dhuhr:
    case BotCommands.Asr:
    case BotCommands.Maghrib:
    case BotCommands.Iftar:
    case BotCommands.Isha:
    case BotCommands.Midnight:
      return await handlePrayerAPIData(command, response, dynamicData);
    default:
      return response;
  }
}
