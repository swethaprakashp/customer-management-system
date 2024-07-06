const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/database');
const routes = require('./routes/customerRoutes')
const app = express();

//connect to database
connectDB();

//middleware
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/customer',routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`
    ));