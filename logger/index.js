const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, errors} = format;

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    json(),
    errors({stack:true}),
  ),
  defaultMeta: { application: 'webapp' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: '/var/log/webapp/webapp.log' }),
  ],
});
module.exports = logger;