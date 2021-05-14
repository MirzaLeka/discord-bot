import { createEmbededMessage } from "./create-embed.discord";
import { Message } from "discord.js";
import { EmbededResponse } from "../../models/response-message.model";
import { MessageRecepient } from "../../enums/message-recepient.enum";

export const emitEmbededMessage = async (messageEmitter: Message, embeds: EmbededResponse, channel: MessageRecepient) => {

  const embededMessage = createEmbededMessage(embeds.title, embeds.description, embeds.color);
  const sentMessage = await messageEmitter[channel].send(embededMessage);

  if (!embeds.duration || embeds.duration === -1) {
    return;
  }

  setTimeout(() => {
    sentMessage.delete();
  }, 1000 * embeds.duration);
}
