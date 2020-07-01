/*
 *  Entry Point for back-end (index.js)
 */

// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// Error handler
const errorHandler = require('./middleware/error');

// Router files
const projectRoute = require('./routes/v1/projects');
const apiRoute = require('./routes/v1/apis');
const authRoute = require('./routes/v1/auth');

// Load env file
dotenv.config({
    path: './config/config.env'
});

// Load DB file
const connectDB = require('./config/db');

// Connect to DB
connectDB();

// Init express
const app = express();

// BodyParser middleware
app.use(express.json());

/** ROUTE Settings **/
app.use('/api/v1/projects', projectRoute);
app.use('/api/v1/apis', apiRoute);
app.use('/api/v1/auth', authRoute);
/** Route ends here **/

// ErrorHandler Middleware
app.use(errorHandler);

// Listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold));