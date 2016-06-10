// Main job is to parse into json, and parse back into json.
module.exports = function(app, models) {

    var userModel = models.userModel;

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

    // Bind the CRUD operations with urls and functions onto the EXPRESS app
    app.post("/api/user", createUser);
    // entry point for getting users using url QUERIES: find by username or credentials
    app.get("/api/user", getUsers);
    // app.get("/api/user?username=:username", findUserByUsername); // this won't work, query url doesn't work
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    if (user) {
                        res.status(400).send("Username " + newUser.username + " is already in use!");
                        return;
                    } else {
                        userModel
                            .createUser(newUser)
                            .then(
                                function(user) {
                                    res.json(user);
                                },
                                function(error) {
                                    res.status(400).send(error.data);
                                }
                            );
                    }
                },
                function(error) {
                    res.status(400).send(error.data);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            // if given both
            findUserByCredentials(username, password, res);
        } else if (username) {
            // if given only username
            findUserByUsername(username, res);
        } else {
            // no given queries, respond with all users.
            res.json(users);
        }
    }

    // A helper for getUsers();
    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    // more or less authentication error
                    res.status(403).send("No such username password pair found!" + " " + error.data);
                }
            );
    }

    // A helper for getUsers();
    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(404).send("No such username found!" + " " + error.data);
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(404).send("User id is not found: " + id + + ". " + error.data);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    // 400: client not possible to update user
                    res.status(404).send("Failed to update user with id: " + id + "! " + error.data);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    // 404: client not possible to delete user
                    res.status(404).send("Unable to remove user with id: " + id + "! " + error.data);
                }
            );
    }
};