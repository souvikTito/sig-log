
/**
* Middleware for storing the application logs with customization of the log types
* @author   Souvik Mal
* @version  1.0.0
* @since    09-09-2023
* @see      Service file '../services/userRegservice'
* @summary  Middleware for storing the application logs
* @description This middleware file is imported in the app(main file) and the functions are exported
* @license LTTS
*/


const winston = require('winston');

const ElasticsearchTransport = require('winston-elasticsearch').ElasticsearchTransport;

//importing the logging format
const { combine, timestamp, json } = winston.format;

// Default to info if not specified in .env
const logLevel = process.env.LOG_LEVEL || 'info';

const elkNode = process.env.ELK_URL;

// configuring the winston modules
const logger = winston.createLogger({

    level: logLevel,

    format: combine(timestamp(), json()),

    transports: [
        new winston.transports.Console(),

        new ElasticsearchTransport({

            indexPrefix: 'sign-lgin',

            clientOpts: {
                node: elkNode,
            }
        })
    ],

});


// To store logs in the local file named combined.log and error.log 

logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' })),

    logger.add(new winston.transports.File({ filename: 'combined.log' }));

// Instead of using pm2-intercom, use the following code to integrate with PM2

if (process.env.NODE_ENV === 'production' && process.env.PM2_USAGE === 'true') {
    const pm2 = require('pm2');

    pm2.connect((err) => {

        if (err) {
            console.error(err);
            process.exit(1);
        }

        pm2.sendDataToProcessId({

            id: process.env.pm_id,
            type: 'log:PM2',
            data: { message: 'Logger connected to PM2' },
            topic: 'logger:connect',
        },
            (err, res) => {
                pm2.disconnect();
            });
    });
}



module.exports = logger;
// to write morgan into winston logs 
logger.stream = {

    write: function (message) {

        logger.info(message.trim())

    }
}






// Function to store aplication logs

function requestLogger(req, res, next) {

    logger.info(`${req.method} ${req.url}`);

    next();
}




// Function to log the errors in application

function errorLogger(err, req, res, next) {

    logger.error(err.message, err);

    // next(err);
}





//Export the functions for use in other parts of the application
module.exports = { logger, requestLogger, errorLogger };
