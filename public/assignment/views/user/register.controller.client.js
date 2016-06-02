(function() {
    angular
        .module("WAMApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, passwordVerify) {

            // Early password validation
            if (password !== passwordVerify) {
                vm.error = "Passwords do not match!";
                return;
            }

            var newUser = {};
            newUser.username = username;
            newUser.password = password;

            // Unique username validation in the server side
            UserService
                .createUser(newUser)
                .then(
                    function(response) {
                        $location.url("/user/" + response.data._id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();