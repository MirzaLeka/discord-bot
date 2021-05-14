import { BotCommands } from "../enums/bot-commands.enum";
import { BotResponses } from "../enums/bot-responses.enum";
import { Colors } from "../enums/colors.enum";
import { Roles } from "../enums/roles.enum";

export interface EmbededResponse {
  title?: string,
  description?: BotResponses | string,
  color?: Colors,
  duration?: number
}

export enum ResponseAction {
  Kick = 'kick',
  Ban = 'ban',
  BulkDelete = 'bulkDelete',
  DeleteChannel = 'deleteChannel',
  CreateChannel = 'createChannel'
}

export interface ResponseMMessageDetails {
  isGlobal: boolean, // if global => send to channel, otherwise sent to author
  rolesApplicable: Roles[], // if empty => it's applicable to all roles
  embeds?: EmbededResponse,
  action?: ResponseAction
}

export type MessagesColletion = {
  [message in BotCommands | string]: ResponseMMessageDetails
}

export const getMessagesCollection = (username: string) => {

  const currentDate = new Date().toString().split(' ').slice(1, 4).join(' | ');
  const currentTime = new Date().toString().split(' ')[4].split(':').join(' : ');

  const messagesCollection: MessagesColletion = {
    [BotCommands.Help]: { isGlobal: false, rolesApplicable: [], embeds: { title: 'Help', description: BotResponses.Help, color: Colors.Yellow } },
    [BotCommands.Rules]: { isGlobal: true, rolesApplicable: [], embeds: { title: 'Rules', description: BotResponses.Rules, color: Colors.Orange } },
    [BotCommands.Date]: { isGlobal: true, rolesApplicable: [], embeds: { title: 'Server date', description: currentDate, color: Colors.White, duration: 60 } },
    [BotCommands.Time]: { isGlobal: true, rolesApplicable: [], embeds: { title: 'Server time', description: currentTime, color: Colors.Black, duration: 60 } },
    [BotCommands.Facebook]: { isGlobal: false, rolesApplicable: [], embeds: { title: 'Facebook group', description: BotResponses.Facebook, color: Colors.Blue } },
    [BotCommands.Discord]: { isGlobal: false, rolesApplicable: [], embeds: { title: '', description: BotResponses.Discord, color: Colors.Black } },
    [BotCommands.Invite]: { isGlobal: false, rolesApplicable: [], embeds: { title: '', description: BotResponses.Discord, color: Colors.Black } },
    [BotCommands.Hi]: { isGlobal: true, rolesApplicable: [], embeds: { title: `${username}, ${BotResponses.Hi}`, description: '', color: Colors.Green, duration: 30 } },
    [BotCommands.Hello]: { isGlobal: true, rolesApplicable: [], embeds: { title: `${username}, ${BotResponses.Hi}`, description: '', color: Colors.Green, duration: 30 } },
    [BotCommands.Bye]: { isGlobal: true, rolesApplicable: [], embeds: { title: `${username}, ${BotResponses.Bye}`, description: '', color: Colors.Blue, duration: 30 } },
    [BotCommands.Welcome]: { isGlobal: true, rolesApplicable: [ Roles.Admin, Roles.Moderator ], embeds: { title: BotResponses.Welcome, description: '', color: Colors.Yellow, duration: 45 } },
    [BotCommands.Warn]: { isGlobal: true, rolesApplicable: [ Roles.Admin, Roles.Moderator ], embeds: { title: BotResponses.Warn, description: '', color: Colors.Red, duration: 60 } },
    [BotCommands.Git]: { isGlobal: false, rolesApplicable: [ Roles.Developer ], embeds: { title: 'Git repository', description: BotResponses.Git, color: Colors.White } },
    // [BotCommands.Kick]: { isGlobal: true, rolesApplicable: [ Roles.Admin, Roles.Moderator ], action: ResponseAction.Kick }, // not used
    // [BotCommands.Ban]: { isGlobal: true, rolesApplicable: [ Roles.Admin ], action: ResponseAction.Ban }, // not used
    // [BotCommands.CreateChannel]: { isGlobal: true, rolesApplicable: [ Roles.Admin, Roles.Moderator ], action: ResponseAction.CreateChannel }, // not used
    // [BotCommands.DeleteChannel]: { isGlobal: true, rolesApplicable: [ Roles.Admin, Roles.Moderator ], action: ResponseAction.DeleteChannel }, // not used
    [BotCommands.DeleteHistory]: { isGlobal: true, rolesApplicable: [ Roles.Admin, Roles.Moderator ], action: ResponseAction.BulkDelete }, // actions must be global!
    [BotCommands.Imsak]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.Blue, duration: 30 } },
    [BotCommands.Sunrise]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.Green, duration: 30 } },
    [BotCommands.Fajr]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.Yellow, duration: 30 } },
    [BotCommands.Dhuhr]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.White, duration: 30 } },
    [BotCommands.Asr]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.Blue, duration: 30 } },
    [BotCommands.Iftar]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.Green, duration: 30 } },
    [BotCommands.Maghrib]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.Yellow, duration: 30 } },
    [BotCommands.Isha]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.White, duration: 30 } },
    [BotCommands.Midnight]: { isGlobal: true, rolesApplicable: [],  embeds: { title: 'Lorem', description: 'Ipsum', color: Colors.Blue, duration: 30 } },
  }

  return messagesCollection;
}
