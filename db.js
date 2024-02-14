const {Sequelize} = require('sequelize');
const sequelize= new Sequelize(
  'assignment01',
  'root',
  '123',
  {
    dialect:'mysql',
    host:'127.0.0.1',
  }
);
const connectToDb = async ()=>{
  try{
    await sequelize.authenticate();
    return true;
  }
  catch(error){
    return false;
  }
}
module.exports = {sequelize,connectToDb}