const Sequelize=require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = require('../database');

const Scount=sequelize.define('scount',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true
  },
  totalCount:{
    type:Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports=Scount;
