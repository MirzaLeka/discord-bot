import { Client, Message } from "discord.js";
import { ClientEvents } from "../enums/client-events.enum";
import { emitToDiscord } from "../discord/emit-message.discord";
import { handleInput } from "../handlers/user-input.handler";
const { DISCORD_TOKEN } = process.env;

const manageBot = async (messageEmitter: Message) => {

  const botResponse = await handleInput(messageEmitter);

  if (!botResponse) {
    return null;
  }

  return emitToDiscord(messageEmitter, botResponse);
}


export const start = async (client: Client) => {
  client.login(DISCORD_TOKEN);
  client
    .on(ClientEvents.Ready, () => console.log('P2CBot Connected!'))
    .on(ClientEvents.Message, (messageEmitter: Message) => manageBot(messageEmitter));
};
