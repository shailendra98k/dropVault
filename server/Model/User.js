const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('dropbox', process.env.MYSQL_DB_USER, process.env.MYSQL_DB_PASSWORD, {
    host: process.env.MYSQL_DB_URL,
    dialect: 'mysql'
});
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    identifier: {
        type: DataTypes.UUID,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    verified :{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

sequelize.sync().then(() => {
    console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
module.exports = User;
