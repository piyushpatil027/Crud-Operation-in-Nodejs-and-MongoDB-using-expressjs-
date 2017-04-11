

// write all depency here 
var path = require('path'),
routes = require('./routes'),
exphbs = require('express-handlebars'), //view template
express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
morgan = require('morgan'), //debunging
methodOverride = require('method-override'), // method over ride put get
errorHandler = require('errorhandler')
moment = require('moment'); //error handiling


//create module 
module.exports = function(app) {
	app.use(morgan('dev'))
	app.use(bodyParser({
       uploadDir:path.join(__dirname, 'public/upload/temp')
	}));
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
    routes(app);//moving the routes to routes folder.
   
   app.use('/public/', express.static(path.join(__dirname, '../public')));

   if ('development' === app.get('env')) {
   	app.use(errorHandler());
   }

   app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
        timeago: function(timestamp) {
            return moment(timestamp).startOf('minute').fromNow();
        }
    }
	}).engine);
	app.set('view engine', 'handlebars');

   return app;
};