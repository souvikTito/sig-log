
const express = require('express');
//create a router instance
const router = express.Router();

// Import user registration controller
const userRegistration = require('../controller/userReg.controller');


// middleware for jwt authentication
const authMiddleware = require('../middleware/jwt.middleware')

// middleware for password hashing
const methods = require('../middleware/methods.middleware');






// Define routes with HTTP methods and associated controller functions


// Routes to create a user
router.all('/users/register', methods([`POST`]), userRegistration.saveUserDetails);

// Routes for login
router.all('/users/login', methods([`POST`]), userRegistration.login);







router.all("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    data: [],
    status: 404,
    message: "Endpoint not found",
  });
});






//Export the functions for use in other parts of the application
module.exports = router;







