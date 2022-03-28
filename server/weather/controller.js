const pool = require("../db")
const queries = require("./queries")

const getWeatherData = (req, res) => {
	pool.query("SELECT * FROM weather", (error, results) => {
		if (error) throw error
		res.status(200).json(results.rows)
	})
}

const addWeather = (req, res) => {
	const {time, temp, feels_like, humidity, pressure, visibility, wind_speed, sunrise, sunset, description} = req.body

	// check if forecast exists
	pool.query(queries.checkForecastExists, [time], (error, results) => {
		if (results.rows.length) {
			res.send("A forecast for that hour already exists.")
		}

		// add forecast to db
		pool.query(queries.addWeather, [time, temp, feels_like, humidity, pressure, visibility, wind_speed, sunrise, sunset, description], (error, results) => {
			if (error) throw error
			res.status(201).send("Weather created successfully!")
		})
	})
}

module.exports = {
	getWeatherData,
	addWeather,
}
