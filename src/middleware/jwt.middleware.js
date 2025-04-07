

//Import JSON web token module
const jwt = require('jsonwebtoken');

// Load environment variables
require("dotenv").config();

//Import configuartion file
const config = require('../config/config.json');

const errorHandlingMiddleware = require('./errorHandler.middleware');
const { error } = require('winston');

const tokenBlacklist = new Set(); // Maintain a set of invalidated tokens







exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return errorHandlingMiddleware('No token', 400, "", res);
    }

    // Check if the token is in the blacklist
    if (tokenBlacklist.has(token)) {
        return errorHandlingMiddleware('Token is no longer valid', 400, "", res);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return errorHandlingMiddleware('Invalid token', 400, "", res);
        }
        req.userId = decoded.id;
        next();
    });
};





exports.generateToken = (userData) => {

    return jwt.sign({ id: userData.id, email: userData.email, role: userData.role }, process.env.JWT_SECRET, {

        expiresIn: parseInt(config.jwtTokenExpiresIn)

    });
};




exports.isLoggedIn = async (req, res, next) => {
    try {

        //   const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {

                // Check for token expiration 
                return errorHandlingMiddleware(err.message, 400, "", res)
            }

            req.user = decoded;
            next();

        });

    } catch (error) {

        console.log(`error in isLoggedIn function ${error}`);
    }
};



