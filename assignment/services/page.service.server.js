module.exports = function(app, models) {

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456" }
    // ];

    function createPage(req, res) {
        var newPage = JSON.parse(JSON.stringify(req.body));
        var websiteId = req.params.websiteId;
        if (newPage == null) {
            res.status(400).send("A page cannot be null!");
            return;
        }

        // Find the relevant website
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    var pageWebsite = website;
                    if (!pageWebsite) {
                        res.status(400).send("Given website ID " + websiteId + " does not exist!");
                        return;
                    }

                    // Proceed to create page
                    pageModel
                        .createPage(websiteId, newPage)
                        .then(
                            function(page) {
                                if (!page) {
                                    res.status(400).send("Failed to create page for website with ID "
                                        + websiteId + "! " + error.data);
                                    return;
                                }

                                // Update website with new page id
                                pageWebsite.pages.push(page._id);
                                websiteModel
                                    .updateWebsite(websiteId, pageWebsite)
                                    .then(
                                        function(website) {
                                            // Finally, respond with page.
                                            res.json(page);
                                        },
                                        function(error) {
                                            // Failed to update the page reference to the website
                                            res.status(400).send(
                                                "Failed to update list of page references to website with id: "
                                                + websiteId + "! " + error.data);
                                        });
                            },
                            function(error) {
                                res.status(400).send(
                                    "Failed to create page for website with ID " + websiteId + "! "
                                    + error.data);
                            });
                },
                function(error) {
                    res.status(400).send(error.data);
                });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.status(400).send(
                        "Failed to retrieve pages for given website ID: " + websiteId + "! "
                        + "Reason: " + error.data);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    if (!page) {
                        res.status(404).send(
                            "Given page ID: " + pageId + " not found!");
                        return;
                    }
                    res.json(page);
                },
                function(error) {
                    res.status(400).send(
                        "Failed to retrieve page for given page ID: " + pageId + "! "
                        + "Reason: " + error.data);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var updatedPage = req.body;

        if (updatedPage == null) {
            res.status(400).send("A page cannot be null!");
        }

        pageModel
            .updatePage(pageId, updatedPage)
            .then(
                function(page) {
                    res.send(200);
                },
                function(error) {
                    res.status(400).send(
                        "Failed to update page for given page ID: " + pageId + "! "
                        + "Reason: " + error.data);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        // Delete page
        pageModel
            .deletePage(pageId)
            .then(
                function(page) {
                    if (!page) {
                        res.status(400).send("Failed to delete any page!");
                        return;
                    }

                    // retrieve parent website from deleted page
                    var websiteId = page._website;
                    websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function(website) {
                                if (!website) {
                                    res.status(400).send("Parent website does not exist!");
                                    return;
                                }

                                // clean up deleted page references in parent website
                                for (var i in website.pages) {
                                    if (website.pages[i].equals(pageId)) {
                                        website.pages.splice(i, 1);
                                    }
                                }

                                // Update with clean website
                                websiteModel
                                    .updateWebsite(websiteId, website)
                                    .then(
                                        function(website) {
                                            res.send(200);
                                        },
                                        function(error) {
                                            res.status(404).send(
                                                "Failed to update list of page references in website with id: "
                                                + websiteId + "! " + error.data);
                                        }
                                    );
                            },
                            function(error) {
                                res.status(400).send(
                                    "Failed to retrieve website with ID: " + websiteId + "! "
                                    + "Reason: " + error.data);
                            }
                        );
                },
                function(error) {
                    res.status(400).send(
                        "Failed to delete page for given page ID: " + pageId + "! "
                        + "Reason: " + error.data);
                }
            );
    }
};