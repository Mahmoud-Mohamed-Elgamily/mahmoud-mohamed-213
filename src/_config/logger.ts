import { createLogger, transports } from 'winston';

export const logger = createLogger({
  transports: [new transports.Console()],
  // we can use different transport for different logging capabilities
});
