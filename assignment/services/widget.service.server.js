module.exports = function(app) {

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

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req, res) {
        var newWidget = JSON.parse(JSON.stringify(req.body));
        var pageId = req.params.pageId;

        if (newWidget == null) {
            res.status(400).send("Widget cannot be null!");
            return;
        } else if (newWidget.widgetType == null || newWidget.name === "") {
            res.status(400).send("A widget must have a type!");
            return;
        }

        newWidget._id = "" + (new Date()).getTime();
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        if (pageId) {
            var matchedWidgets = [];
            for (var i in widgets) {
                var widgetI = widgets[i]
                if (widgetI.pageId === pageId) {
                    matchedWidgets.push(JSON.parse(JSON.stringify(widgetI)));
                }
            }
            res.json(matchedWidgets);
            return;
        }
        res.status(400).send("Given invalid page ID: " + pageId);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            var widgetI = widgets[i];
            if (widgetI._id === widgetId) {
                res.json(JSON.parse(JSON.stringify(widgetI)));
                return;
            }
        }
        res.status(404).send("Given widget ID: " + widgetId + " not found!");
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;

        if (updatedWidget == null) {
            res.status(400).send("Widget cannot be null!");
            return;
        } else if (updatedWidget.widgetType == null || updatedWidget.name === "") {
            res.status(400).send("A widget must have a type!");
            return;
        }

        for (var i in widgets) {
            var widgetI = widgets[i];
            if (widgetI._id === widgetId) {
                widgets[i] = JSON.parse(JSON.stringify(updatedWidget));
                res.send(200);
                return;
            }
        }
        res.status(400).send("Given widget ID: " + widgetId + " not found!");
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(400).send("Given widget ID: " + widgetId + " not found!");
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