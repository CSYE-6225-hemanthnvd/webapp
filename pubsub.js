const {PubSub} = require('@google-cloud/pubsub');
const logger = require('./logger');

const pubSubClient = new PubSub();
async function publishMessageWithCustomAttributes (topicName, data) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  try{
    const messageId = await pubSubClient.topic(topicName).publishMessage({data: dataBuffer});
    logger.info({
      message: `Message ${messageId} published to ${topicName}.`,
      log_type: "pubsub"
    });
  }catch(err){
    logger.error(err.message);
  }
}

module.exports = publishMessageWithCustomAttributes;