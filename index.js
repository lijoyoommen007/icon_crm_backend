const path = require('path');
// load dependencies
const env = require('dotenv');
const csrf = require('csurf');
const express = require('express');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store); // initialize sequelize with session store

const app = express();
const router = express.Router();

// Load Routes 
const webRoutes = require('./routes/web');
const sequelize = require('./config/database');
const errorController = require('./app/controllers/ErrorController');

env.config();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(webRoutes);
app.use(errorController.pageNotFound);

// Sync the database and alter tables to match models
sequelize
    .sync({ alter: true })
    .then(() => {
        app.listen(process.env.PORT, '0.0.0.0'); // Listen on IP address 0.0.0.0
        console.log("App listening on port " + process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;
