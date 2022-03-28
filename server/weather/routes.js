const {Router} = require("express")
const controller = require("./controller")

const router = Router()
router.get("/", controller.getWeatherData)
router.post("/", controller.addWeather)

module.exports = router
