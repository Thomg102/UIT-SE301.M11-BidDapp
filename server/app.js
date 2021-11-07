var express = require("express");
const bodyParser = require("body-parser"); 
const cors = require('cors');

var app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());

// -- Route
const userRouter = require("./routes/userRoutes");

// ROUTING
app.use("/api/users", userRouter);

module.exports = app;