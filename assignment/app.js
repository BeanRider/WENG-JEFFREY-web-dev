// Root of server-side application. The entry point of the server-side app.
// Takes in the EXPRESS app from the server.
module.exports = function(app) {

    // Load Server Service Files into EXPRESS, then allow the services to use the app by passing in the app.
    var userService = require("./services/user.service.server.js")(app);
    var websiteService = require("./services/website.service.server.js")(app);
    var pageService = require("./services/page.service.server.js")(app);
    var widgetService = require("./services/widget.service.server.js")(app);

    app.get("/say/:message", function(req, res) { // ':' means wildcard, holds values
        var msg = req.params["message"];
        console.log(msg);
    });

};