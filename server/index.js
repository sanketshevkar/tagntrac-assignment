const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoute = require('./routes/auth');
const shipmentRoute = require('./routes/shipment');
const partnerRoute = require('./routes/partner');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT).then(() => {
    console.log('Connected to DB');
});

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/shipment', shipmentRoute);
app.use('/api/partner', partnerRoute);


app.listen(3000, () => console.log("Server Up"));