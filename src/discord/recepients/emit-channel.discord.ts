import { Message, TextChannel } from "discord.js";
import { ResponseMMessageDetails } from "../../models/response-message.model";
import { MessageRecepient } from "../../enums/message-recepient.enum";
import { emitEmbededMessage } from "../embeds/emit-embed.discord";
import { handleChannelAction } from "./emit-action.discord";

// @messageEmitter => instance of a Message object from Discord.js
// @responseMessage => message that will be emitted

// Sends Message to a channel where the last message was sent in
export const emitToChannel = (messageEmitter: Message, responseMessage: ResponseMMessageDetails | undefined): any => {

  if (responseMessage && responseMessage.embeds) {
    return emitEmbededMessage(messageEmitter, responseMessage.embeds, MessageRecepient.Channel);
  }

  if (responseMessage && responseMessage.action) {
    handleChannelAction(messageEmitter.channel as TextChannel, responseMessage.action);
  }

}
