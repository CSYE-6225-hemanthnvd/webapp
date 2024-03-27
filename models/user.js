const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');

const user = sequelize.define("user", {
  id: {
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  is_verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  email_sent: {
    type: Sequelize.BIGINT,
  },
  link_clicked: {
    type: Sequelize.BIGINT,
  },
  account_created: {
    type: Sequelize.STRING,
  },
  account_updated: {
    type: Sequelize.STRING,
  },
},
  {
    timestamps: false
  });
module.exports = user;