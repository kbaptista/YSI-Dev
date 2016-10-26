var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var cors = require ('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');

var configDB = require('./config/db');
mongoose.connect(configDB.url);

var port = process.env.PORT || 3000;

var login = require('./app/routes/login');
var signup = require('./app/routes/signup');

var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'ysi_session_secret',
    resave : true,
    saveUninitialized: true
}));

app.set('views', __dirname + '/app/views');
app.set('view engine','ejs');

app.use(cors(corsOptions));
app.use(flash());

app.get('/login',login.showLoginPage);
app.get('/signup',signup.showSignupPage);

app.listen(port);