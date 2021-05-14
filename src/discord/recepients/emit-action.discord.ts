import { TextChannel } from "discord.js";
import { ResponseAction } from "../../models/response-message.model";
import * as logger from '../../services/logger.service';

// Actions are always emitted to channel
export const handleChannelAction = (channel: TextChannel, action: ResponseAction, dynamicData?: any) => {

  try {
    channel[ResponseAction.BulkDelete](100, true); // max num is 100
  } catch (e) {
    logger.error({ message: 'Unable to delete messages', payload: e.message });
  }

}
