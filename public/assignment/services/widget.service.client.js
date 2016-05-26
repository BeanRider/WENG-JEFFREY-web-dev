(function() {
    angular
        .module("WAMApp")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
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

        var api = {
            createWidget        : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById      : findWidgetById,
            updateWidget        : updateWidget,
            deleteWidget        : deleteWidget
        }
        return api;

        /**
         * C: Adds new user parameter instance to the local widgets array
         * @param {number} pageId - the page id to set in the new addition
         * @param widget - the widget to add
         */
        function createWidget(pageId, widget) {
            // TODO find out how to create widget based on type
            widget.push({
                "_id": widget._id,
                "widgetType": widget.widgetType,
                "pageId": pageId,
                "size": widget.size,
                "text": widget.text
            });
        }

        /**
         * R: the widgets with pageId === given pageId
         * @param {number} pageId - the page id to match
         * @return {Array} array of widgets with matching pageId
         */
        function findWidgetsByPageId(pageId) {
            var matchedWidgets = [];
            for (var i in widgets) {
                var widgetI = widgets[i]
                if (widgetI.pageId === pageId) {
                    matchedWidgets.push(angular.copy(widgetI));
                }
            }
            return matchedWidgets;
        }

        /**
         * R: the page with _id === widgetId
         * @param {number} widgetId - the widget id to match
         * @return the matched widget OR null if DNE
         */
        function findWidgetById(widgetId) {
            for (var i in widgets) {
                var widgetI = widgets[i];
                if (widgetI._id === widgetId) {
                    return angular.copy(widgetI);
                }
            }
            return null;
        }

        /**
         * U: Update the widget with _id === widgetId with the given widget properties
         * @param {number} widgetId - the widget id to match
         * @param the widget to be used to update
         * @return {boolean} true if update was successful
         */
        function updateWidget(widgetId, widget) {
            // TODO find how to update widget based on type
            for (var i in widgets) {
                var widgetI = widgets[i];
                if (widgetI._id === widgetId) {
                    widgetI.widgetType = widget.widgetType;
                    widgetI.pageId = widget.pageId;
                    widgetI.size = widget.size;
                    widgetI.text = widget.text;
                    return true;
                }
            }
            return false;
        }

        /**
         * D: Deletes the widget with _id === widgetId
         * @param {number} widgetId - the page id to match
         * @return {boolean} true if the deletion was successful
         */
        function deletePage(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }


    }

})();