// depecncy libary is give express
var express = require('express'),
//create object of express framework
config = require('./server/configure'),
app = express();	

//we define constant
app.set('port',process.env.PORT || 3300);
//define viwes
app.set('viwes',__dirname+'/viwes');
//configure app
app = config(app);




app.listen(app.get('port'),function(){
	 console.log('Server up: http://localhost:' + app.get('port'));
});

