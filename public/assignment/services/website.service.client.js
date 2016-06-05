(function() {
    angular
        .module("WAMApp")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            createWebsite      : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById    : findWebsiteById,
            updateWebsite      : updateWebsite,
            deleteWebsite      : deleteWebsite
        };
        return api;

        /**
         * C: Adds new website parameter instance to the local websites array
         *    Sets new website's developerId to the given userId
         * @param userId - the developer
         * @param website - the website to add
         */
        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        /**
         * R: the websites with developerId === userId
         * @param {number} userId
         * @returns {Array} of matched websites
         */
        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        /**
         * R: the website with _id === given websiteId
         * @param {number} websiteId
         * @returns the matched website OR null if DNE
         */
        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        /**
         * U: Updates the users with _id === given websiteId with the given website
         * @param {number} websiteId
         * @param website to use to update
         * @returns {boolean} true if update was successful
         */
        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        /**
         * D: Deletes the website with _id === websiteId parameter
         * @param {number} userId - user to delete
         * @returns {boolean} true if the deletion was successful
         */
        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();