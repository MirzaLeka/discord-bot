import { LogLevel } from "../enums/log-level.enum";

export interface LogResponse {
  level: LogLevel,
  appVersion: string | undefined,
  timestamp: string,
  logId: string,
  message: string,
  payload?: any
}

export interface LogMessage {
  message: string,
  payload?: any
}
