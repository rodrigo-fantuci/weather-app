const getWeather = "SELECT * FROM weather"
const addWeather =
	"INSERT INTO weather (time, temp, feels_like, humidity, pressure, visibility, wind_speed, sunrise, sunset, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);"
const checkForecastExists = "SELECT w FROM weather w WHERE w.time = $1;"

module.exports = {
	getWeather,
	addWeather,
	checkForecastExists,
}
