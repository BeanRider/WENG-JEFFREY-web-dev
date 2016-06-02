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
                        console.log(response);
                        var user = response.data;
                        if (user != null) {
                            $location.url("/user/" + user._id);
                        }
                    },
                    // Error
                    function(error) {
                        vm.error = "User not found!";
                    });
        }
    }
})();