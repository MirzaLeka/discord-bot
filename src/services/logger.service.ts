import { createWriteStream } from 'fs';
import { randomBytes } from 'crypto';
import Debug from "debug";
import { Env } from "../enums/env.enum";
import { LogResponse, LogMessage } from "../models/log-format.model";
import { LogLevel } from "../enums/log-level.enum";
import { LogIndentation } from '../enums/log-indentation.enum';
import { ClientEvents } from '../enums/client-events.enum';


// Utils

const silent = process.env.NODE_ENV === Env.Test || process.env.NODE_ENV === Env.Staging

const getLogId = (): string => randomBytes(16).toString('hex');

const getCurrentDateTime = () => {
  const now = new Date();
  return new Date(
  Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  )).toUTCString();
}


// Logging

const createLogObject = ({ message, payload }: LogMessage, level: LogLevel): LogResponse => ({
  level,
  appVersion: process.env.npm_package_version,
  timestamp: getCurrentDateTime(),
  logId: getLogId(),
  message,
  payload
});


const logToFile = (data: LogResponse, indentation: LogIndentation = LogIndentation.None) => {
  if (silent || !data || !data.message) return;

  const ws = createWriteStream(`${data.level}.log`, {flags: 'a'}) as any;

  ws
    .end(`${JSON.stringify(data, undefined, indentation)}, \n`)
    .on(ClientEvents.Error, () => console.log('Unable to log to file!'));
}

const logToConsole = (data: LogResponse) => {
  if (silent || !data || !data.message) return;

  Debug('logger')(data);
}


// Functions to call

export const log = (data: LogMessage) => logToConsole(createLogObject(data, LogLevel.Info));

export const info = (data: LogMessage, indentation?: LogIndentation) => logToFile(createLogObject(data, LogLevel.Info), indentation);

export const debug = (data: LogMessage, indentation?: LogIndentation) => logToFile(createLogObject(data, LogLevel.Debug), indentation);

export const warn = (data: LogMessage, indentation?: LogIndentation) => logToFile(createLogObject(data,  LogLevel.Warn), indentation);

export const error = (data: LogMessage, indentation?: LogIndentation) => logToFile(createLogObject(data, LogLevel.Error), indentation);
