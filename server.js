var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var authentication = require('./app/middleware/authentication');

var cors = require ('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');

var configDB = require('./config/db');
mongoose.connect(configDB.url);

var port = process.env.PORT || 3000;

var login = require('./app/routes/login');
var signup = require('./app/routes/signup');
var user = require('./app/routes/user');
var project = require('./app/routes/project');
var usersStories = require('./app/routes/userStories');

var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

require('./app/middleware/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'ysi_session_secret',
    resave : true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', __dirname + '/app/views');
app.set('view engine','ejs');

app.use(cors(corsOptions));

app.get('/login',login.showLoginPage);
app.get('/signup',signup.showSignupPage);

app.post('/signup', signup.passportSignup);
app.get('/welcome', signup.welcome);

app.post('/login', login.passportLogin);
app.post('/logout',login.logout);

app.get('/loggedin', login.loggedIn);

app.get('/users',authentication.isAuthenticated(),user.allUsers);
app.get('/user/:id',user.findById);

app.get('/projects',project.allProjects);
app.get('/projects/:id', project.findById);
app.post('/projects', project.createProject);

app.post('/userStories', userStories.createUserStories);

/* Test du middleware logged in */
app.get('/profile',authentication.isAuthenticated(), function(req,res){
   res.send('Logged in');
});

app.listen(port);