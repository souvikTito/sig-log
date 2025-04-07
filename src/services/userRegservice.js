

// import axios for making HTTP requests
const axios = require('axios');

// import database connection configuration
const dbConnection = require('../config/dbConfig/dbCon.config');

// // Import winston logger middleware
// const { logger } = require('../middleware/winston.middleware');


// Import JWT utilities for JSON web tokens
const jwtUtils = require('../middleware/jwt.middleware');

// Import error handling middleware
const errorHandlingMiddleware = require('../middleware/errorHandler.middleware');


const { request } = require('express');

// Import randomUUID from the crypto
const { randomUUID } = require('crypto');



const { compare } = require('bcrypt');

//
const successHandlingMiddleware = require('../middleware/successHandler.middleware');







// Async function to save user details
async function saveUserDetails(req, res, next) {
    try {
        // Extract user data from the request body
        const userData = {
            email: req.body.email?.toLowerCase(),  // optional chaining for safety
            fullname: req.body.fullname,           // fixed typo from 'fulname'
            password: req.body.password,
            account: req.body.account              // fixed typo from 'accaunt'
        };

        userData.id = randomUUID();

        console.log("Saving user data", userData);

        // Make an HTTP POST request using axios
        const response = await axios.request(
            dbConnection("POST", "registrationa", userData)
        );

        console.log("Response", response.data);

        // Log that user details were saved successfully
        logger.info("User details saved successfully");

        // Send a success response
        successHandlingMiddleware(
            "User details saved successfully",
            response.data,     // fix: pass `response.data` instead of full response object
            201,
            res
        );
    } catch (error) {
        // Handle errors properly
        return errorHandlingMiddleware(error.message, 500, "", res);
    }
}


async function login(req, res, next) {
    // Extract the userName from the query parameters
    const { email, password } = req.body;

    try {

        // Make an HTTP GET request to view user details using axios
        const response = await axios.request(dbConnection("GET", "registrations/" + email, ""));

        // Optional chaining to check if response and data are defined
        if (!response || !response?.data?.data.length || response == undefined) {
            // If the response doesn't contain the expected data, return a 404 error
            return errorHandlingMiddleware("User does not exist", 409, "", res)
        }

        // Check if the password provided matches the stored password
        const isValidPassword = await comparePassword(password, response.data.data[0].password);

        if (!isValidPassword) {
            // If the password is incorrect, return a 404 error
            return errorHandlingMiddleware("Password is incorrect", 409, "", res)
        }


        const access_token = jwtUtils.generateToken(response.data.data[0]);

        //object distructure
        const { password: pass, ...data } = response.data.data[0];

        data.access_token = access_token

        // Log that user details were retrieved successfully
        logger.info('user details retrieved successfully');

        // Send a success response with status 200 and user details
        successHandlingMiddleware("user details retrieved successfully", data, 200, res)

    } catch (error) {
        // Handle errors using the errorHandlingMiddleware function
        return errorHandlingMiddleware(error, 500, { email, password }, res);
    }
}









//Export the functions for use in other parts of the application
module.exports = {
    saveUserDetails,
    login,


}


