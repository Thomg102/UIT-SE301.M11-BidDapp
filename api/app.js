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
const approveOfferRouter = require("./routes/approveOfferRoutes");
const newOfferRouter = require("./routes/newOfferRoutes");
const transferRouter = require("./routes/transferRoutes");

// ROUTING
app.use("/api/users", userRouter);
app.use("/api/approve-offers", approveOfferRouter);
app.use("/api/new-offers", newOfferRouter);
app.use("/api/transfers", transferRouter);

module.exports = app;