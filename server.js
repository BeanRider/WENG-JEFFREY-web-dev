var express = require('express');
var app = express();

// Enables the ability to parse the body as json
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session support
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

// PassportJS (needs to occur after the express session)
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // Strategies are like plugins
app.use(passport.initialize());
app.use(passport.session()); // this makes passportjs to remember the session

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// Put the instance of app into our application
var assignment = require('./assignment/app.js');
assignment(app);

require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
