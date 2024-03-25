const {Sequelize, UUIDV4} = require('sequelize');
const {sequelize} = require('../db');

const user = sequelize.define("user", {
  id:{
    defaultValue: UUIDV4,
    type: Sequelize.STRING,
    primaryKey:true,
  },
  first_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  username:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
    validate:{
      isEmail: true
    }
  },
  is_verified:{
    type: Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue:false  
  },
  email_sent:{
    type: Sequelize.DATE,
  },
  link_clicked:{
    type: Sequelize.DATE
  },
  account_created:{
    type: Sequelize.STRING,
  },
  account_updated:{
    type: Sequelize.STRING,
  },  
},
{
  timestamps:false
});
module.exports=user;