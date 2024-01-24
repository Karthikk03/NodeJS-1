const Sequelize=require('sequelize');

const sequelize = require('../database');
const { DataTypes } = require('sequelize');


const Student=sequelize.define('students',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type:Sequelize.STRING,
    allowNull: false,
  },
  count:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
})

module.exports=Student;
