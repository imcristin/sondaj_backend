let express = require('express'),
    path = require('path'),
    createError = require('http-errors'),
    http = require('http'),
    dotenv = require('dotenv'),
    expressSession = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require("passport-auth0"),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db = require('./models'),
    next = require('next');
    // jsx = require('jsx');

let app = express();
dotenv.config({path:'.env'})


Role=db.role;

// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });
db.sequelize.sync();


var corsOptions = {
    // origin: "http://192.168.56.1",
    origin: "*",
};
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// app.use(express.static(path.join(__dirname,'public')))
// app.get('/home',(req,res)=>{
//     res.sendFile(path.join(__dirname,'.public/home.html'));
// })aaaaa

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


//routes
app.get('/', function(req, res) {
    res.send('Page under construction.');
    });

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/poll.routes')(app);
require('./routes/anwser.routes')(app);


// error handler
app.use(function(err, req, res,next){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') ==='development '?err:{};
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    // res.send("asd");
});

//Create roles
function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}


module.exports = app;