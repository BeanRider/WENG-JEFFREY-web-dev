/*
 * Contains API for accessing user data: CRUD operations
 */
(function() {
    angular
        .module("WAMApp")
        .factory("UserService", UserService); // $scope is a service, $location, $routeParams are all services. They allow for dependency injections

    function UserService($http) {

        var api = {
            createUser            : createUser,
            findUserById          : findUserById,
            findUserByUsername    : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser            : updateUser,
            deleteUser            : deleteUser
        };
        return api;

        /**
         * C: Adds new user parameter instance to the local users array.
         * @param user - the user
         */
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        /**
         * R: the user with the given _id in the local users array
         * @param {number} userId
         * @returns the user with the _id === userID OR null if DNE
         */
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        /**
         * R: the user with the given username in the local users array
         * @param {string} username
         * @returns the users with the same username OR null if DNE
         */
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        /**
         * R: the user with the given username and password pair in the local users array
         * @param {string} username
         * @param {string} password
         * @returns the user with the username and password pair
         */
        function findUserByCredentials(username, password) {
            // Don't really need the "http://localhost:3000" part bellow:
            // var url = "http://localhost:3000/api/user?username=" + username + "&password=" + password;
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url); // returns a promise
        }

        /**
         * U: Updates the user with matching _id with the given user information.
         * @param {number} userId - user to update
         * @param {user} user - user to be used to update
         * @returns {boolean} true if the update was successful
         */
        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user); // returns a promise
        }

        /**
         * D: Deletes the user with _id === userId parameter
         * @param {number} userId - user to delete
         * @returns {boolean} true if the deletion was successful
         */
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url); // returns a promise
        }
   }
})();