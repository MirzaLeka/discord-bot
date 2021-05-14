import { Message } from "discord.js";
import { EmbededResponse } from "../../models/response-message.model";
import { MessageRecepient } from "../../enums/message-recepient.enum";
import { emitEmbededMessage } from "../embeds/emit-embed.discord";

export const emitToAuthor = (messageEmitter: Message, embeds: EmbededResponse) => emitEmbededMessage(messageEmitter, embeds, MessageRecepient.Author);
