const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

// routes
const { home } = require("./routes/routes")

require("dotenv").config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true }))

PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

app.use(home)

module.exports = app