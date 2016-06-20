var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require('bcrypt-nodejs');

// Main job is to parse into json, and parse back into json.
module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get("/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get("/auth/facebook/callback",
        passport.authenticate("facebook", {
            successRedirect: "/assignment/#/user",
            failureRedirect: "/assignment/#/login"
        }));

    // Bind the CRUD operations with urls and functions onto the EXPRESS app
    app.post("/api/user", createUser);

    // the body is safely tucked into the http post request, rather than in the url.
    // First goes to passport.authenticate, and if passport passes, go to login. if the passport failed, pass forbidden 403
    app.post("/api/login", passport.authenticate('web-app-maker'), login);

    app.post("/api/register", register);

    app.post("/api/logout", logout);

    app.get("/api/loggedin", loggedin);

    // entry point for getting users using url QUERIES: find by username or credentials
    app.get("/api/user", getUsers);
    // app.get("/api/user?username=:username", findUserByUsername); // this won't work, query url doesn't work
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    // app.delete("/api/user/:userId", authenticate, deleteUser);
    // this will intercept with authenticate on the server side, and make sure
    // it is the user in this session. You can put any number of such middlewares in between.
    // function authenticate(req, res, next) {
    //     console.log(req.user);
    //     console.log(req.isAuthenticated());
    //     if (req.isAuthenticated()) {
    //         next(); // go forward and call next(), which will go to deleteUser.
    //     } else {
    //         res.send(401); // ?
    //         res.send(403); // not authorized
    //     }
    // }

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    console.log(facebookConfig.callbackURL);

    passport.use('web-app-maker', new LocalStrategy(localStrategy));
    passport.use("facebook", new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        console.log(profile);
        userModel
            .findUserByFacebookId(id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = {
                            // TODO this username is a temporary way to resolve this, make sure to validate this.
                            username: profile.displayName.replace(/ /g, ""),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        return userModel.createUser(newUser);
                    }
                },
                function(error) {
                    return done(error);
                }
            )
            .then(
                function(user) {
                    return done(null, user);
                },
                function(error) {
                    return done(error);
                }
            );

        console.log(profile);
        // TODO
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user); // it enhances the request object with the user.
                    } else {
                        return done(null, false);
                    }
                },
                function(error) {
                    if (error) {
                        return done(error);
                    }
                }
            );
    }

    // called right before the response goes back to the client.
    function serializeUser(user, done) {
        done(null, user); // in this case the entire user is being serialized.
    }

    // right before passport intercepts the request, verify data has not been tampered, that the userId is still valid.
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    // resets the session
                    done(null, user);
                },
                function(error) {
                    done(error, null); // 403
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        console.log(username);
        console.log(password);

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log("After confirming with model that username doesn't already exist: " + user);
                    if (user) {
                        res.status(400).send("Username already exists!");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        console.log("After encrypting password: " + req.body);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user) {
                    // passport added this login function
                    req.login(user, function(err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedin(req, res) {
        // isAuthenticated is provided by passport.
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function createUser(req, res) {
        var newUser = req.body;

        // Null check
        if (newUser == null) {
            res.status(400).send("A username cannot be null!");
            return;
        }

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
            res.status(400).send("Unable to respond to given URL query!");
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
                    if (!user) {
                        res.status(404).send(
                            "Given user ID: " + id + " not found!");
                        return;
                    }
                    res.json(user);
                },
                function(error) {
                    res.status(404).send("User id is not found: " + id + ". " + error.data);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        if (!newUser) {
            res.status(400).send("Provided a null updated user!");
            return;
        }

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
                function(user) {
                    res.send(200);
                },
                function(error) {
                    // 404: client not possible to delete user
                    res.status(404).send("Unable to remove user with id: " + id + "! " + error.data);
                }
            );
    }
};