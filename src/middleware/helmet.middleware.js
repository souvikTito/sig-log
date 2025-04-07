


const helemt = require('helmet')



//Define the helemt with preffered options
const helmetoptions = {

    contentSecurityPolicy: {

        directives: {
        },

    },

    frameguard: {

        // Deny framing of the web site in iframes
        action: 'deny',

    },

}




//Export the functions for use in other parts of the application
module.exports = helemt(helmetoptions)



