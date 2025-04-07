

//Import config file
const config = require('./astraDB.config')










const dbConnection = (method, url, data) => {
    try {
        const { ASTRA_DB_ID, ASTRA_DB_REGION, ASTRA_DB_KEYSPACE, ASTRA_DB_APPLICATION_TOKEN } = config.astra;
        const configObj = {
            method: method,
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'X-Cassandra-Token': ASTRA_DB_APPLICATION_TOKEN
            },

            // templet literal
            url: `https://${ASTRA_DB_ID}-${ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/keyspaces/${ASTRA_DB_KEYSPACE}/` + url, data,
        };

        console.log("configObjJJJJJJJJJJJJ", configObj);

        logger.info('Database connected successfully')
        return configObj;

    } catch (error) {
        errorLogger(error)
    }
}


//Export the functions for use in other parts of the application
module.exports = dbConnection;

