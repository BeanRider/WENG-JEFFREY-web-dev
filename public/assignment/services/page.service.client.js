(function() {
    angular
        .module("WAMApp")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

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
            var newPage = angular.copy(page);
            newPage.websiteId = websiteId;
            pages.push(newPage);
            console.log(pages);
        }

        /**
         * R: the pages with websiteId === given websiteId
         * @param {number} websiteId - the webpage id to match
         * @return {Array} array of pages with matching websiteId
         */
        function findPageByWebsiteId(websiteId) {
            var matchedPages = [];
            for (var i in pages) {
                var pageI = pages[i];

                if (pageI.websiteId === websiteId) {
                    matchedPages.push(angular.copy(pageI));
                }
            }
            return matchedPages;
        }

        /**
         * R: the page with _id === pageId
         * @param {number} pageId - the page id to match
         * @return the matched page OR null if DNE
         */
        function findPageById(pageId) {
            for (var i in pages) {
                var pageI = pages[i];
                if (pageI._id === pageId) {
                    return angular.copy(pageI);
                }
            }
            return null;
        }

        /**
         * U: Update the page with _id === pageId with the given page properties
         * @param {number} pageId - the page id to match
         * @param the page to be used to update
         * @return {boolean} true if update was successful
         */
        function updatePage(pageId, page) {
            for (var i in pages) {
                var pageI = pages[i];
                if (pageI._id === pageId) {
                    pages[i] = angular.copy(page);
                    console.log(pages[i]);
                    return true;
                }
            }
            return false;
        }

        /**
         * D: Deletes the user with _id === pageId
         * @param {number} pageId - the page id to match
         * @return {boolean} true if the deletion was successful
         */
        function deletePage(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();