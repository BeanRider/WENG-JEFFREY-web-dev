/*
 * Contains API for accessing user data: CRUD operations
 */
(function() {
    angular
        .module("WAMApp")
        .factory("UserService", UserService); // $scope is a service, $location, $routeParams are all services. They allow for dependency injections

    function UserService() {
        var users = [
           {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
           {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
           {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
           {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser

        }
        return api;


        /**
         * C: Add new user parameter instance to the local users array.
         * @param user - the user
         */
        function createUser(user) {
            users.push(angular.copy(user));
        }

        /**
         * R: the user with the given _id in the local users array
         * @param {number} userID
         * @returns the user with the _id === userID OR null if DNE
         */
        function findUserById(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    // BY DEFAULT: angular uses references, therefore return a copy to prevent modifications.
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        /**
         * R: the user with the given username in the local users array
         * @param {string} username
         * @returns the users with the same username OR null if DNE
         */
        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        /**
         * R: the user with the given username and password pair in the local users array
         * @param {string} username
         * @param {string} password
         * @returns the user with the username and password pair
         */
        function findUserByCredentials(username, password) {
            for (var i in users) { // 'i' is an index, not the object
                if (users[i].username === username
                    && users[i].password === password) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        /**
         * U: Updates the user with matching _id with the given user information.
         * @param {number} userId - user to update
         * @param {string} user - user to be used to update
         * @returns {boolean} true if the update was successful
         */
        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    return true;
                }
            }
            return false;
        }

        /**
         * D: Deletes the user with _id === userId parameter
         * @param {number} userId - user to delete
         * @returns {boolean} true if the deletion was successful
         */
        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users.remove(users[i]);
                    return true;
                }
            }
            return false;
        }
   }
})();