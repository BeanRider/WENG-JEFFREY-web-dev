(function() {
    angular
        .module("WAMApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {

        var vm = this;
        // put all event handlers at the top, just like variables
        vm.updateUser = updateUser;
        vm.unregister = unregister;

        var id = $routeParams["uid"];
        // execute on load time.
        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                    vm.success = "User successfully updated!"
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();