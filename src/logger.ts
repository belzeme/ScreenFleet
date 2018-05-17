import * as winston from 'winston';

const level = process.env.LOG_LEVEL || 'debug';

export const logger = new winston.Logger({
    exitOnError: false,
    transports: [
        new winston.transports.Console({
            colorize: true,
            handleExceptions: true,
            level,
            timestamp: () => new Date().toISOString()
        })
    ]
});
