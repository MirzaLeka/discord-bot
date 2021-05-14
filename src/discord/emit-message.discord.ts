import { Message } from "discord.js";
import { ResponseMMessageDetails } from "../models/response-message.model";
import { emitToChannel } from "./recepients/emit-channel.discord";
import { emitToAuthor } from "./recepients/emit-author.discord";

export const emitToDiscord = (messageEmitter: Message, responseMessage: ResponseMMessageDetails): any => {

  if (responseMessage.isGlobal) {
    return emitToChannel(messageEmitter, responseMessage); // Send message to the Channel
  } else if (responseMessage.embeds) {
    return emitToAuthor(messageEmitter, responseMessage.embeds) // Sends Message to the Author
  }

}
