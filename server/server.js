const express = require("express")
const cors = require("cors")
const weatherRoutes = require("./weather/routes")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
	res.send("Hello world!")
})

app.use("/api/results", weatherRoutes)

app.listen(5000, () => console.log("server listening on port 5000"))
