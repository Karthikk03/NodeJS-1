const Sequelize=require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = require('../database');

const Attendance=sequelize.define('attendance',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isPresent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  }
})

module.exports=Attendance;
