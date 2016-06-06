(function() {
    angular
        .module("WAMApp")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget        : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById      : findWidgetById,
            updateWidget        : updateWidget,
            deleteWidget        : deleteWidget
        };
        return api;

        /**
         * C: Adds new widget parameter instance to the server widgets array
         * @param {number} pageId - the page id to set in the new addition
         * @param widget - the widget to add
         */
        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        /**
         * R: the widgets with pageId === given pageId
         * @param {number} pageId - the page id to match
         * @return {Array} array of widgets with matching pageId
         */
        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        /**
         * R: the page with _id === widgetId
         * @param {number} widgetId - the widget id to match
         * @return the matched widget OR null if DNE
         */
        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        /**
         * U: Update the widget with _id === widgetId with the given widget properties
         * @param {number} widgetId - the widget id to match
         * @param the widget to be used to update
         * @return {boolean} true if update was successful
         */
        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        /**
         * D: Deletes the widget with _id === widgetId
         * @param {number} widgetId - the page id to match
         * @return {boolean} true if the deletion was successful
         */
        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }
    }
})();