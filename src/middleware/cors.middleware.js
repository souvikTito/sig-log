

//Import the in-built CORS module
const cors = require('cors');





const corsOptions = {

    // be default any origin is supported
    origin: '*',

    // specify the HTTP methods that are allowed
    methods: 'GET, POST, PUT, DELETE',

    // HTTP  response ststus code for successful OPTIONS requests
    optionsSuccessStatus: 200

}





//Export the functions for use in other parts of the application
module.exports = cors(corsOptions);