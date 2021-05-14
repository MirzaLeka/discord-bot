require('dotenv').config();
import { Client } from 'discord.js';
import { start } from './startup/start';
import * as logger from "./services/logger.service";
import { LogIndentation } from './enums/log-indentation.enum';

try {
  start(new Client());
} catch (e) {
  logger.error({ message: 'Unable to start Discord Client', payload: e.message });
}

process.on('uncaughtException', (error) => {
  logger.error({ message: 'uncaught exception', payload: error.message }, LogIndentation.Small);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error({ message: 'unhandled rejection', payload: error }, LogIndentation.Small);
  process.exit(1);
});
