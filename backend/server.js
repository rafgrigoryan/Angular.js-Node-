const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const mongoose = require('./config/database');
const passport = require('./config/passport')
const routes = require('./app/routes/indexRoutes')



const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(routes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});