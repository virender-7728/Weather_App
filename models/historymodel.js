
// creating weatherhistory model
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const WeatherHistory = sequelize.define('WeatherHistory', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'weather_history',
  timestamps:false
});

module.exports = WeatherHistory;
