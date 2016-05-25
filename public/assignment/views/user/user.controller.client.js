(function() {
    angular
        .module("WAMApp")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    // View model design pattern
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]

    function ProfileController($routeParams) {
        var vm = this;
        // put all event handlers at the top, just like variables
        vm.updateUser = updateUser;

        var id = $routeParams["uid"];
        console.log(id);

        var index = -1;

        // execute on load time.
        function init() {
            for (var i in users) {
                if (users[i]._id === id) {
                    vm.user = users[i];
                    index = i;
                }
            }
        }
        init();

        function updateUser() {
            users[index].username = vm.user.username;
            users[index].firstName = vm.user.firstName;
            users[index].lastName = vm.user.lastName;
            vm.success = "User successfully updated!"
        }
    }

    function LoginController($location) { // location allows you to programmatically change the url
                                          // lets you read or set the current url.
        var vm = this;
        vm.hello = "Hello from view model";

        vm.login = login;
        function login(username, password) {
            for (var i in users) { // 'i' is an index, not the object
                if (users[i].username === username
                    && users[i].password === password) {
                    var id = users[i]._id;
                    $location.url("/user/" + id);
                } else {
                    vm.error = "User not found!";
                }
            }
            console.log(username);
            console.log(password);
        }
    }
})();