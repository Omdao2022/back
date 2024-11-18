import { createLogger, format, transports } from 'winston'

const logger = createLogger({
    level: 'debug',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'serverLog.log' }),
    ],
})

export default logger
