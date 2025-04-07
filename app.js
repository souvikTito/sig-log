


//Import the in-built node modules

//express JS framework for NodeJS
const express = require('express');

// middleware for parsing JSON 
const bodyParser = require('body-parser');

// HTTP request logger middleware
const morgan = require('morgan');

//Middleware for tracking response times
const responseTime = require('response-time')

//Load environment variable from .env file
require('dotenv').config();




// Import custom middleware modules

// Middleware for enhancing security
const helmet = require('./src/middleware/helmet.middleware');

// Middleware for handling Cross-Origin Resource Sharing (CORS)
const cors = require('./src/middleware/cors.middleware');

// Rate limiter middleware
const limit = require('./src/middleware/rateLimiter.middleware')



// Importing user routes module
const userRoutes = require('./src/routes/userRoutes');

// middleware for error handling
const errorHandlingMiddleware = require('./src/middleware/errorHandler.middleware')


// Create an Express application
const app = express();




// Usage of middlewares

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// Parse JSON data
app.use(bodyParser.json());



// Enhance security with helmet
app.use(helmet);

// Enable CORS support
app.use(cors);

// Track response time 
app.use(responseTime());


//Define a route for '/api' and apply rate limiting middleware and user routes
app.use('/api/v0.1/', limit, userRoutes);

// Apply custom error handling middleware for bad requests, not found, and internal server errors
app.use(errorHandlingMiddleware)









// Set the port from environment variable or use 3000 as default
app.set('port', process.env.PORT || 3000);

// Start the server
app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});




