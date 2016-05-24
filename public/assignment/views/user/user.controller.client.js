(function() {
    angular
        .module("WAMApp")
        .controller("LoginController", LoginController);

    function LoginController() {
        // View model design pattern
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]

        var vm = this;
        vm.hello = "Hello from view model";

        vm.login = login;

        function login (username, password) {
            for (var i in users) { // 'i' is an index, not the object
                if (users[i].username === username
                    && users[i].password === password) {
                    console.log("YAY");
                } else {
                    vm.error = "User not found";
                }
            }
            console.log(username);
            console.log(password);
        }
    }
})();