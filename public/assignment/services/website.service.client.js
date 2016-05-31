(function() {
    angular
        .module("WAMApp")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ]

        var api = {
            createWebsite      : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById    : findWebsiteById,
            updateWebsite      : updateWebsite,
            deleteWebsite      : deleteWebsite,
        };
        return api;

        /**
         * C: Adds new website parameter instance to the local websites array
         *    Sets new website's developerId to the given userId
         * @param userId - the developer
         * @param website - the website to add
         */
        function createWebsite(userId, website) {
            if (website.description != null) {
                websites.push({
                    "_id": "" + (new Date).getTime(),
                    "name": website.name,
                    "description": website.description,
                    "developerId": userId
                });
            } else {
                websites.push({
                    "_id": "" + (new Date).getTime(),
                    "name": website.name,
                    "developerId": userId
                });
            }
        }

        /**
         * R: the websites with developerId === userId
         * @param {number} userId
         * @returns {Array} of matched websites
         */
        function findWebsitesByUser(userId) {
            var matchedWebsites = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    matchedWebsites.push(angular.copy(websites[i]));
                }
            }
            return matchedWebsites;
        }

        /**
         * R: the website with _id === given websiteId
         * @param {number} websiteId
         * @returns the matched website OR null if DNE
         */
        function findWebsiteById(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    return angular.copy(websites[i]);
                }
            }
            return null;
        }

        /**
         * U: Updates the users with _id === given websiteId with the given website
         * @param {number} websiteId
         * @param website to use to update
         * @returns {boolean} true if update was successful
         */
        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i] = angular.copy(website);
                    return true;
                }
            }
            return false;
        }

        /**
         * D: Deletes the website with _id === websiteId parameter
         * @param {number} userId - user to delete
         * @returns {boolean} true if the deletion was successful
         */
        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();