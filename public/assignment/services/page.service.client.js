(function() {
    angular
        .module("WAMApp")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            createPage          : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById        : findPageById,
            updatePage          : updatePage,
            deletePage          : deletePage
        };
        return api;

        /**
         * C: Adds new page parameter instance to the local user array.
         * @param {number} websiteId - the webpage id related to this new page
         * @param page - the page to add
         */
        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        /**
         * R: the pages with websiteId === given websiteId
         * @param {number} websiteId - the webpage id to match
         * @return {Array} array of pages with matching websiteId
         */
        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        /**
         * R: the page with _id === pageId
         * @param {number} pageId - the page id to match
         * @return the matched page OR null if DNE
         */
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        /**
         * U: Update the page with _id === pageId with the given page properties
         * @param {number} pageId - the page id to match
         * @param the page to be used to update
         * @return {boolean} true if update was successful
         */
        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        /**
         * D: Deletes the user with _id === pageId
         * @param {number} pageId - the page id to match
         * @return {boolean} true if the deletion was successful
         */
        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();