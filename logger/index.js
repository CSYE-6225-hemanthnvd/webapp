const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, errors} = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
    errors({stack:true}),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: '/var/log/webapp/webapp.log' }),
  ],
});
module.exports = logger;