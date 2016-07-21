
//REQUIREMENTS
var mongoUri 		= process.env.MONGOLAB_URI || 'mongodb://localhost/pearson_vegas',
	express      	= require('express'),
    bodyParser     	= require('body-parser'),
    mongoose       	= require('mongoose'),
    port           	= process.env.PORT || 3000,
    app            	= express();

// MIDDLEWARE
// mongoose.connect('mongodb://localhost:27017/pearson_vegas');
mongoose.connect(mongoUri);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// CONTROLLERS
var attendeesController = require('./controllers/attendeesController.js');
app.use('/attendees', attendeesController);

// LISTEN
mongoose.connection.once('open', function(){
app.listen(port, function() {
    console.log('Running on port ' + port);
    })
});
