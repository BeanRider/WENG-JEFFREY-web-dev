module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    // app.get("/api/user?username=:username", findUserByUsername); // this won't work, query url doesn't work

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];

        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserById(req, res) {
        var id = req.params["userId"];
        for (var i in users) {
            if (users[i]._id === id) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByCredentials(username, password, res) {
        for (var u in users) {
            if (users[u].username === username
            && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }

    function findUserByUsername(username, res) {
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }

}