import { Message } from "discord.js";
import { getDynamicResponse } from "./dynamic-data.handler";
import { getResponseMessage } from "../handlers/response-message.handler";
import { SpecialCharacters } from "../enums/special-chars.enum";
import { BotCommands } from "../enums/bot-commands.enum";

export const handleInput = async (messageEmitter: Message) => {

  if (!messageEmitter.content || !messageEmitter.content.startsWith(SpecialCharacters.ExclamationMark)) {
    return null;
  }

  const command = messageEmitter.content as BotCommands;
  const responseMesasge = getResponseMessage(command, messageEmitter);

  // if you enter command that doesn't exist or you're not eligible to use it
  if (!responseMesasge) {
    return null;
  }

  return getDynamicResponse(command, responseMesasge, messageEmitter);
}
