const express = require('express');

// Env
require('dotenv').config();

// Connection
require('./config/db.config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Seperate Route
const app_route = require('./routes/app.route');
app.use('/', app_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})

module.exports = app; // for testing