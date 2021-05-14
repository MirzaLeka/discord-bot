import { BotCommands } from "../enums/bot-commands.enum";
import { ResponseMMessageDetails, getMessagesCollection } from "../models/response-message.model";
import { Roles } from "../enums/roles.enum";
import { getUserInfo, getUserRoles } from "../services/user.service";
import { Message } from "discord.js";

const getUsername = (messageEmitter: Message): string | null => {
  const author = getUserInfo(messageEmitter);

  if (!author) {
    return null;
  }

  return author.username;
}

const getRoles = (messageEmitter: Message): Roles[] | null => {
  const roles = getUserRoles(messageEmitter);

  if (!roles) {
    return null;
  }

  return roles;
}


const isEligibleForCommand = (userRoles: Roles[], rolesApplicable: Roles[]): boolean => {

  // some commands are applicable to all roles
  if (rolesApplicable.length === 0) {
    return true;
  }

  const includeApplicableRoles = userRoles.some(role => rolesApplicable.includes(role));

  if (!includeApplicableRoles) {
    return false;
  }

  return true;
}


// returns bot response based on username, roles and bot command
export const getResponseMessage = (botCommand: string | BotCommands, messageEmitter: Message): ResponseMMessageDetails | null => {

  // note: most commands dont have anything to split
  const [ command ] = botCommand.split(' ');

  const username = getUsername(messageEmitter);

  if (!username) {
    return null;
  }

  const responseMessageDetails = getMessagesCollection(username)[command];

  if (!responseMessageDetails) {
    return null;
  }

  const roles = getRoles(messageEmitter);

  if (!roles) {
    return null;
  }

  if (!isEligibleForCommand(roles, responseMessageDetails.rolesApplicable)) {
    return null;
  }

  return responseMessageDetails;
};
