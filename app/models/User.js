const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
  userid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  useremail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userrole: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  indexes: [
    // Create a unique index on useremail
    {
      unique: true,
      fields: ['useremail']
    }
  ],
  tableName: 'users' // Optional: Specify table name if different from model name
});

module.exports = User;
