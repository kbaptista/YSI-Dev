var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var jwt = require ('jwt-simple');

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
var authenticate = require('./app/routes/authenticate');
var usersStories = require('./app/routes/userStories');
var sprint = require('./app/routes/sprint');

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

app.get('/signup',signup.showSignupPage);

app.post('/signup', signup.jwtSignup);
app.post('/authenticate', authenticate.getAuthentication);
app.get('/memberinfo', passport.authenticate('jwt', { session : false}), user.getInfo);
app.get('/userConnected', passport.authenticate('jwt', { session : false}), user.getUserConnected);

app.post('/logout',login.logout);

app.get('/users',user.allUsers);
app.get('/user/:id',user.findById);

app.get('/public/projects', project.allPublicProjects);
app.get('/projects',passport.authenticate('jwt', { session : false}),project.allProjects);
app.get('/projects/:id', passport.authenticate('jwt', { session : false}),project.findById);
app.post('/projects/:id/users', project.addUserToProject);
app.post('/projects', passport.authenticate('jwt', { session : false}),project.createProject);

app.get('/userStories/:id/project',usersStories.UsFromProject);
app.post('/userStories',usersStories.createUserStories);

app.delete('/userStories/:id',usersStories.removeUserStory);
app.get('/userStories/:id',usersStories.getUserStoryById);
app.put('/userStories/:id',usersStories.updateUserStory);
app.post('/userStories/:id/tasks', usersStories.addTaskToUserStory);
app.get('/userStories/:id/tasks', usersStories.getTasksFromUs);

app.post('/sprints',sprint.createSprint);
app.delete('/sprints/:id',sprint.removeSprint);
app.get('/sprints/:id',sprint.getSprintById);
app.get('/sprints/:id/project',sprint.SprintFromProject);
app.put('/sprints/:id',sprint.updateSprint);
app.post('/sprints/:id/us', sprint.addUsToSprint);
app.get('/sprints/:id/us', sprint.getUsFromSprint);
app.get('/sprints/:id/tasks', sprint.getTasksFromSprint);

app.post('/tasks',sprint.createTask);
app.get('/tasks',sprint.getTasks);
app.delete('/tasks/:id',sprint.removeTask);
app.get('/tasks/:id', sprint.getTaskById);
app.put('/tasks/:id', sprint.UpdateStateTask);

app.listen(port);
