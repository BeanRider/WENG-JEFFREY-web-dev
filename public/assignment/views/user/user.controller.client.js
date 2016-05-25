(function() {
    angular
        .module("WAMApp")
        .controller("LoginController", LoginController)

    // View model design pattern
    function LoginController($location, UserService) {
        // $location allows you to programmatically change the url: allows read or set the current url.

        var vm = this;
        vm.hello = "Hello from view model";

        vm.login = login;
        function login(username, password) {

            var user = UserService.findUserByCredentials(username, password);
            if (user != null) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "User not found!";
            }

            console.log(username);
            console.log(password);
        }
    }
})();