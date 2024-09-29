const express = require("express")
const axios = require("axios")
const dotenv = require("dotenv").config()
const app = express()
const cors = require('cors');
app.use(cors());

const weatherRoute = require("./routes/weatherRoutes")
const sequelize = require("./db/connection")
sequelize.sync()

app.use(express.static("public"));
const port = process.env.PORT || 3000

app.use('/get/', weatherRoute);

app.listen(port, (req,res) => {
    console.log(`server listening on port: ${port}`)
})
