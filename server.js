const app = require('./app');
const logger = require('./logger');
const user = require('./models/user');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info({
    message: `Server running on port ${port}`,
    log_type: "application"
  })
});