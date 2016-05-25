/*
 *
 */
(function() {
    angular
        .module("WAMApp")
        .factory("UserService", UserService); // $scope is a service, $location, $routeParams are all services. They allow for dependency injections

    // API lives here.
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

        function createUser(user) {
            
        }

        function deleteUser(id) {

        }

        function findUserByCredentials(username, password) {
            for (var i in users) { // 'i' is an index, not the object
                if (users[i].username === username
                    && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(id) {
            for (var i in users) {
                if (users[i]._id === id) {
                    // BY DEFAULT: angular uses references. TODO CHECK THIS
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

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
   }
})();