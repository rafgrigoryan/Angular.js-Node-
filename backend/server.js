const express = require('express');
const mongoose = require('./config/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});