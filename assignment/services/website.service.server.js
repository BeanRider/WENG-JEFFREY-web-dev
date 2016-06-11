module.exports = function(app, model) {

    var websiteModel = model.websiteModel;
    var userModel = model.userModel;

    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456" },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234" }
    // ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = JSON.parse(JSON.stringify(req.body));
        var devId = req.params.userId;

        // Null check
        if (newWebsite == null || devId == null) {
            res.status(400).send("A website or developerId cannot be null!");
            return;
        }

        // 1. Create website in website model
        websiteModel
            .createWebsiteForUser(devId, newWebsite)
            .then(
                function(website) {

                    userModel
                        .findUserById(devId)
                        .then(
                            function(user) {

                                // User with devId does not exist
                                if (!user) {
                                    res.status(400).send("Given developer id " + devId + " does not exist!");
                                    return;
                                }

                                // Add new website reference to user
                                user.websites.push(website._id);
                                console.log(user.websites);
                                userModel
                                    .updateUser(devId, user)
                                    .then(
                                        function(user) {
                                            // DO NOTHING
                                        },
                                        function(error) {
                                            // Failed to update the website reference to the user
                                            res.status(404).send(
                                                "Failed to update list of website references to user with id: "
                                                + id + "! " + error.data);
                                        }
                                    );

                                res.json(website);
                            },
                            function(error) {
                                res.status(400).send(error.data);
                            }
                        );
                },
                function(error) {
                    res.status(400).send(
                        "Failed to create website for user with id "
                        + devId + "! " + error.data);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function(error) {
                    res.status(400).send(
                        "Failed to update website with developer ID: " + userId + "! "
                        + error.data);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(404).send("Given website ID: " + websiteId + " not found! " + error.data);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;

        if (newWebsite == null) {
            res.status(400).send("Provided a null updated website!");
            return;
        }

        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function(website) {
                    res.send(200);
                },
                function(error) {
                    res.status(400).send("Failed to update website with id: " + websiteId + "! " + error.data);
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(website) {

                    var devId = website._user;

                    userModel
                        .findUserById(devId)
                        .then(
                            function(user) {

                                // User with devId does not exist
                                if (!user) {
                                    res.status(400).send("Given developer id " + devId + " does not exist!");
                                    return;
                                }

                                // Clean up website reference in user
                                for (var i in user.websites) {
                                    if (user.websites[i].equals(websiteId)) {
                                        user.websites.splice(i, 1);
                                    }
                                }
                                console.log(user.websites);

                                userModel
                                    .updateUser(website._user, user)
                                    .then(
                                        function(user) {
                                            // Finished all clean up.
                                            res.send(200);
                                        },
                                        function(error) {
                                            // Failed to clean the website reference to the user
                                            res.status(404).send(
                                                "Failed to update list of website references to user with id: "
                                                + id + "! " + error.data);
                                        }
                                    );
                            },
                            function(error) {
                                res.status(400).send(error.data);
                            }
                        );
                },
                function(error) {
                    res.status(404).send("Failed to update website with id: " + websiteId + "! " + error.data);
                }
            );
    }
};