
async function successHandlingMiddleware(message, data, status, res) {
    let successResponse = {
        success: true,
        message: message,
        data: data,
        status: status

    }
    // Send an HTTP response with the determined status and success message
    res.status(status).json(successResponse)
}




//Export the functions for use in other parts of the application
module.exports = successHandlingMiddleware