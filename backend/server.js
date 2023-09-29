const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./config/database');

const app = express();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});