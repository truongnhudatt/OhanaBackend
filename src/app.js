const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const cors = require("cors")
const helmet = require("helmet")
const db = require("./database/init.db")
const app = express()

app.use(morgan('combined'))
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))





app.use("/", require("./routes"))


module.exports = app