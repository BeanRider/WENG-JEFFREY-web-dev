(function() {
    angular
        .module("WAMApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($location, UserService) {
        var vm = this;
        vm.verifyAndCreateUser = verifyAndCreateUser;

        function verifyAndCreateUser(username, password, passwordVerify) {
            // Username already exists
            if (UserService.findUserByUsername(username) != null) {
                vm.error = "Username already exists!";
                return;
            }
            if (password === passwordVerify) {
                var validatedUser = {
                    _id: "" + (new Date).getTime(),
                    username: username,
                    password: password
                }
                UserService.createUser(validatedUser);
                vm.success = "Created new user!";
                $location.url("/user/" + validatedUser._id);
            } else {
                vm.error = "Passwords do not match!";
                return;
            }
        }
    }
})();