module.exports = function(app, models) {

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;

    var multer = require('multer'); // npm install multer --save

    // a multer instance: put the uploaded file to that directory.
    var upload = multer({
        dest: __dirname + '/../../public/uploads'
    });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    // First upload, then after the upload is done, invoke uploadImage function.
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    // Sorting
    app.put("/api/page/:pageId/widget", reorderWidget);

    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

    function createWidget(req, res) {
        var newWidget = JSON.parse(JSON.stringify(req.body));
        var pageId = req.params.pageId;

        if (newWidget == null) {
            res.status(400).send("Widget cannot be null!");
            return;
        } else if (newWidget.type == null || newWidget.type === "") {
            res.status(400).send("A widget must have a type!");
            return;
        }

        // Fill in default widget values
        if (newWidget.type === "IMAGE" && (newWidget.width == null || newWidget.width === "")) {
            newWidget.width = "100%";
        }

        if (newWidget.type === "INPUT" && (newWidget.formatted == null)) {
            newWidget.formatted = false;
        }

        console.log(newWidget);
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function(widget) {
                    if (!widget) {
                        res.status(400).send("Failed to create page for website with ID "
                            + websiteId + "! " + error.data);
                        return;
                    }
                    console.log(widget);

                    // update page with this reference
                    pageModel
                        .findPageById(pageId)
                        .then(
                            function(page) {
                                if (!page) {
                                    res.status(400).send("Given page ID " + pageId + " does not exist!");
                                    return;
                                }

                                page.widgets.push(widget._id);
                                pageModel
                                    .updatePage(pageId, page)
                                    .then(
                                        function(page) {
                                            res.json(widget);
                                        },
                                        function(error) {
                                            res.status(400).send(
                                                "Failed to update list of widget references to page with id: "
                                                + pageId + "! " + error.data);
                                        }
                                    );

                            },
                            function(error) {
                                res.status(400).send("Failed to find given page ID: " + pageId + "! " + error.data);
                            });
                },
                function(error) {
                    res.status(400).send(
                        "Failed to create widget for page with ID " + pageId + "! "
                        + error.data);
                });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    widgets.sort(
                        // ensure order is maintained
                        function(a, b) {
                            return a.order - b.order;
                        });
                    res.json(widgets);
                },
                function(error) {
                    res.status(400).send(
                        "Failed to retrieve widgets for given page ID: " + pageId + "! "
                        + "Reason: " + error.data);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    if (!widget) {
                        res.status(404).send(
                            "Given widget ID: " + widgetId + " not found!");
                        return;
                    }
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send(
                        "Failed to retrieve widget for given widget ID: " + websiteId + "! "
                        + "Reason: " + error.data);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;

        if (updatedWidget == null) {
            res.status(400).send("Widget cannot be null!");
            return;
        } else if (updatedWidget.type == null || updatedWidget.type === "") {
            res.status(400).send("A widget must have a type!");
            return;
        }

        if (updatedWidget.class == null || updatedWidget.class === "") {
            updatedWidget.class = "col-xs-12";
        }

        widgetModel
            .updateWidget(widgetId, updatedWidget)
            .then(
                function(widget) {
                    res.send(200);
                },
                function(error) {
                    res.status(400).send(
                        "Failed to update widget for given widget ID: " + widgetId + "! "
                        + "Reason: " + error.data);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function(widget) {
                    if (!widget) {
                        res.status(400).send("Failed to delete any widget!");
                        return;
                    }

                    var pageId = widget._page;
                    pageModel
                        .findPageById(pageId)
                        .then(
                            function(page) {
                                if (!page) {
                                    res.status(400).send("Failed to retrieve relevant page for widget ID: " + widgetId + "!");
                                    return;
                                }

                                // clean up deleted page references in parent website
                                for (var i in page.widgets) {
                                    if (page.widgets[i].equals(widgetId)) {
                                        page.widgets.splice(i, 1);
                                    }
                                }

                                // Update page
                                pageModel
                                    .updatePage(pageId, page)
                                    .then(
                                        function(page) {
                                            res.send(200);
                                        },
                                        function(error) {
                                            res.status(400).send(
                                                "Failed to update page with ID: " + pageId + "! "
                                                + "Reason: " + error.data);
                                        }
                                    );
                            },
                            function(error) {
                                res.status(400).send(
                                    "Failed to find page with ID: " + widget._page + "! "
                                    + "Reason: " + error.data);
                            }
                        );

                },
                function(error) {
                    res.status(400).send(
                        "Failed to delete widget for given widget ID: " + widgetId + "! "
                        + "Reason: " + error.data);
                }
            );
    }

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);

        widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.send(error.data);
                }
            );
    }
    
    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var width = req.body.width;
        var myFile = req.file; // holds all information about files attached to the request

        if (myFile == null || myFile === undefined) {
            res.redirect(
                "/assignment/#/user/" + userId
                + "/website/" + websiteId
                + "/page/" + pageId
                + "/widget/" + widgetId);
            return;
        }

        var originalname = myFile.originalname; // file name on user computer
        var filename = myFile.filename;         // new file name in upload folder
        var path = myFile.path;                 // full path of uploaded file
        var destination = myFile.destination;   // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;         // extension of the file

        for (var i in widgets) {
            var widgetI = widgets[i];
            if (widgetI._id === widgetId) {
                widgetI.url = "/uploads/" + filename;

                if (width != null && width !== undefined) {
                    widgetI.width = width;
                }
            }
        }
        res.redirect(
            "/assignment/#/user/" + userId
            + "/website/" + websiteId
            + "/page/" + pageId
            + "/widget/" + widgetId);
    }
};