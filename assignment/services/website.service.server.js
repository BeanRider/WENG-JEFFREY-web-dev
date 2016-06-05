module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = JSON.parse(JSON.stringify(req.body));
        var devId = req.params.userId;

        if (newWebsite == null) {
            res.status(400).send("A website cannot be null!");
            return;
        } else if (newWebsite.name == null) {
            res.status(400).send("A website must have a name!");
            return;
        }

        newWebsite._id = "" + (new Date).getTime();
        newWebsite.developerId = devId;

        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        if (userId) {
            var matchedWebsites = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    matchedWebsites.push(JSON.parse(JSON.stringify(websites[i])));
                }
            }
            res.json(matchedWebsites);
            return;
        }
        res.status(400).send("Given invalid developer ID: " + userId + " not found!");
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                res.json(JSON.parse(JSON.stringify(websites[i])));
                return;
            }
        }
        res.status(404).send("Given website ID: " + websiteId + " not found!");
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i] = JSON.parse(JSON.stringify(newWebsite));
                res.send(200);
                return;
            }
        }
        res.status(400).send("Given website id: " + websiteId + " not found!");
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(400).send("Given website id: " + websiteId + " not found!");
    }
};