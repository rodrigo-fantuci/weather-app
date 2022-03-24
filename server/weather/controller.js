const pool = require("../db")

const getWeather = (req, res) => {
	pool.query("SELECT * FROM weather", (error, results) => {
		if (error) throw error
		res.status(200).json(results.rows)
	})
}

module.exports = {
	getWeather,
}
