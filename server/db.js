const Pool = require("pg").Pool

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "weather",
	password: "qwe123",
	port: 3001,
})

module.exports = pool
