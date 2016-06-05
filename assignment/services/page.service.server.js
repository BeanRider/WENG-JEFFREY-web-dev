module.exports = function(app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function createPage(req, res) {
        var newPage = JSON.parse(JSON.stringify(req.body));
        var websiteId = req.params.websiteId;
        if (newPage == null) {
            res.status(400).send("A page cannot be null!");
            return;
        } else if (newPage.name == null || newPage.name === "") {
            res.status(400).send("A page must have a name!");
            return;
        }

        newPage._id = "" + (new Date).getTime();
        newPage.websiteId = websiteId;

        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        if (websiteId) {
            var matchedPages = [];
            for (var i in pages) {
                var pageI = pages[i];
                if (pageI.websiteId === websiteId) {
                    matchedPages.push(JSON.parse(JSON.stringify(pageI)));
                }
            }
            res.json(matchedPages);
            return;
        }
        res.status(400).send("Given invalid website ID: " + websiteId);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            var pageI = pages[i];
            if (pageI._id === pageId) {
                res.json(JSON.parse(JSON.stringify(pageI)));
                return;
            }
        }
        res.status(404).send("Given page ID: " + pageId + "not found!");
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var updatedPage = req.body;

        if (updatedPage == null) {
            res.status(400).send("A page cannot be null!");
        }

        if (updatedPage.name == null || updatedPage.name === "") {
            res.status(400).send("Must provide a page name!");
            return;
        }

        for (var i in pages) {
            var pageI = pages[i];
            if (pageI._id === pageId) {
                pages[i] = JSON.parse(JSON.stringify(updatedPage));
                res.send(200);
                return;
            }
        }
        res.status(400).send("Given page id: " + pageId + " not found!");
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(400).send("Given page id: " + pageId + " not found!");
    }
};