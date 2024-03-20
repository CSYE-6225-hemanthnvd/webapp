const {Sequelize} = require('sequelize');
const logger = require('./logger');
require("dotenv").config();

const sequelize= new Sequelize(
  "webapp",
  process.env.USER || "root",
  process.env.PASSWORD || "123",
  {
    dialect:'mysql',
    host: process.env.HOST || "localhost"
  }
);
const connectToDb = async ()=>{
  try{
    await sequelize.authenticate();
    return true;
  }
  catch(err){
    logger.error(err);
    return false;
  }
}
module.exports = {sequelize,connectToDb}