module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

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
        console.log("reach");

        // Username already exists
        for (var i in users) {
            if (users[i].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use!");
                return;
            }
        }

        newUser._id = "" + (new Date).getTime();
        users.push(newUser);
        res.json(newUser);
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
        for (var u in users) {
            if (users[u].username === username
                && users[u].password === password) {
                res.json(users[u]);
                return;
            }
        }
        res.send(403);
    }

    // A helper for getUsers();
    function findUserByUsername(username, res) {
        for (var u in users) {
            if (users[u].username === username) {
                res.json(users[u]);
                return;
            }
        }
        res.send(403);
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (users[i]._id === id) {
                res.json(users[i]);
                return;
            }
        }
        res.send(403);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id === id) {
                users[i].username = newUser.username;
                users[i].password = newUser.password;
                users[i].email = newUser.email;
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.send(200);
                console.log(users);
                return;
            }
        }
        res.status(400).send("User with id: " + id + " not found!");
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (users[i]._id === id) {
                users.splice(i, 1);
                res.send(200);
                console.log(users);
                return;
            }
        }
        res.status(404).send("Unable to remove user with id: " + id + "!");
    }
};