const axios = require("axios")
const sequelize = require('../db/connection');
const WeatherHistory = require("../models/historymodel");
const generatedDate = require("../controllers/generatedate");
const { response } = require("express");

// fetch data from weather API
const apiweather = async(req,res) => {

    const url = "https://api.openweathermap.org/data/2.5/weather";
    const secret_key = "54d6e36ab5d03904885b4e67b8db8627";
    let cityname = req.params.city; 
    try {
         const response = await axios.get(`${url}?q=${cityname}&appid=${secret_key}`);
         return response

      } catch (error) {
          console.error('Error: City not found', );
          return {
            error: 'Unable to fetch weather data',
            details: error.response ? error.response.data : error.message,
           }
      }
}
const getweathercity =  async (req, res) => {
    try {
      
        const response = await apiweather(req,res)

        let temp = (Math.round(response.data.main.temp - 273.15)).toString();
        const temperature = temp + "°C"
        const city = response.data.name;  
       

        let description = generatedDate //description of date and time
        console.log(description)

// save data to databse
    const weatherRecord = await WeatherHistory.create({ city, temperature, description });
    res.json({
        city: city,
        calltime:description,
        temperature: `${temperature}`,
        mainDesc:response.data.weather[0].main
      });

    }  catch (error) {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

// showing history from database
  const gethistory = async (req, res) => {
    try {

      // deleting all records of databse to reset database
      // const deletedCount = await WeatherHistory.destroy({
      //   where: {},
      // });


      const weatherRecords = await WeatherHistory.findAll({
        order: [['id', 'DESC']], 
        limit: 10, 
      });
      res.status(200).json(
        {
          weatherRecords
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = {getweathercity,gethistory}