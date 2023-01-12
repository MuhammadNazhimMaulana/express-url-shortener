const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Env
require('dotenv').config();

// Connection
require('./config/db.config');

const app = express();

// Setup ejs
app.set('view engine', 'ejs');

// Menggunakan ejs-layouts (Third party Middleware)
app.use(expressLayouts);

// Public Folder
app.use(express.static('public'));

// Set Up view
app.set('views', path.join(__dirname, 'views')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Seperate Route
const home_route = require('./routes/home.route');
const app_route = require('./routes/app.route');
app.use('/', home_route);
app.use('/app', app_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})

module.exports = app; // for testing