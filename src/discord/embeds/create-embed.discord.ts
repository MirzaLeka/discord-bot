import { MessageEmbed } from "discord.js";
import { Colors } from "../../enums/colors.enum";
import { BotResponses } from "../../enums/bot-responses.enum";

// @title => Embed title
// @description => Embed message that will be emitted

export const createEmbededMessage = (title: string = '', description: BotResponses | string = '', color: Colors = Colors.White): MessageEmbed => {

  const embededMessage = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)

  return embededMessage;
}
