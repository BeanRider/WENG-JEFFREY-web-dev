// Root of server side application.
module.exports = function(app) {

    var userService = require("./services/user.service.server.js")(app);
    
    app.get("/say/:message", function(req, res) { // ':' means wildcard, holds values
        var msg = req.params["message"];
        console.log(msg);
    });

    

};