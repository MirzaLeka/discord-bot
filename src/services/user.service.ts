import { Message, User } from "discord.js";
import { Roles } from "../enums/roles.enum";

// get info of a user calling a bot
export const getUserInfo = (messageEmitter: Message): User | undefined | null => {
  if (!messageEmitter) {
    return null;
  }
  return messageEmitter.author;
}

export const getUserRoles = (messageEmitter: Message): Roles[] | undefined | null => {
  if (!messageEmitter) {
    return null;
  }

  // take roles.names from discord roles
  // cast each role to Role enum equivalent
  return messageEmitter.member?.roles.cache.map(role => role.name as Roles);
}
