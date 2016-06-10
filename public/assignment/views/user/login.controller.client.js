(function() {
    angular
        .module("WAMApp")
        .controller("LoginController", LoginController);

    // View model design pattern
    function LoginController($location, UserService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;

        vm.login = login;
        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(
                    // Success
                    function(response) { // <- using promises
                        var user = response.data;
                        if (user) { // Truthy: model.error has to be there to render
                            $location.url("/user/" + user._id);
                        } else {
                            // if responded with a null
                            vm.error = "Username and password pair not found!";
                        }
                    },
                    // Error
                    function(error) {
                        vm.error = "User not found!";
                    });
        }
    }
})();