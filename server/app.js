require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const app = express()
const port = 5000;

require("./Database/dbConnection")   //Connecting to Database
app.use(cookieParser())
app.use(express.json());
app.use(require("./routes/route"))          //creating routes middileware

app.listen(port, () => console.log(`App listening on port ${port}!`))
