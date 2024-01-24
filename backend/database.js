const Sequelize=require('sequelize');

const sequelize=new Sequelize('node','root','1974',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;