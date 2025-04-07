


async function errorHandlingMiddleware(message, status, data, res) {
    let errorResponse = {
        success: false,
        data: data
    }




    // Check if the error has a response property (possibly an axios error)
    if (status === 400) {

        errorResponse.status = status;

        // Custom message for validation errors
        errorResponse.message = message ?? 'Bad request, the inputs are in invalid format or missing';

    } else if (status === 401) {

        errorResponse.status = status;

        // Custom message for missing token
        errorResponse.message = message ?? 'Unauthorized: No token provided';

    } else if (status === 403) {

        errorResponse.status = status;

        // Custom message for invalid token
        errorResponse.message = message ?? 'Forbidden: Token expired';

    } else if (status === 405) {

        errorResponse.status = status;

        // Custom message for wrong method

        errorResponse.message = message;

    } else if (status === 409 || status === 413 || status === 422) {
        // Custom error
        errorResponse.status = status
        errorResponse.message = message
    }
    else {
        // Default message for unknown errors
        errorResponse.status = 500;
        errorResponse.message = message
    }
    // Send an HTTP response with the determined status and error message

    return res.status(status).send(errorResponse)
}






//Export the functions for use in other parts of the application
module.exports = errorHandlingMiddleware;