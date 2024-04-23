// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Food', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
