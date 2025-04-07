





//Middleware between the service and the routes
const userRegistrationService = require('../services/userRegservice');






function saveUserDetails(req, res, next) {
    userRegistrationService.saveUserDetails(req, res, req.body,
        function (err, result) {
            if (err) res.send(err);
            res.send(result);
        });
}



function login(req, res, next) {
    userRegistrationService.login(req, res, req.body,
        function (err, result) {
            if (err) res.send(err);
            res.send(result);
        });
}








//Export the functions for use in other parts of the application
module.exports = {
    saveUserDetails,
    login,

}
