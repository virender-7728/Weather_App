const express = require("express")
const router = express.Router()
const {getweathercity,gethistory} = require("../controllers/controller")

router.route("/weather/:city").get(getweathercity)
router.route("/history").get(gethistory)

module.exports = router