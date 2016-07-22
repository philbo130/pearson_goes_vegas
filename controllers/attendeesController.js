var express = require('express'),
    router  = express.Router(),
	Attendee = require('../models/attendees.js');

//index route for attendees
router.get('/', function(req, res){	
	//to get all attendees from mongo
	Attendee.find({}, function(err, attendees){ 
		//once data returns from mongo, send it out as JSON
		res.json(attendees); 
	});
});

router.post('/', function(req, res){
	var newAttendee = new Attendee(req.body);
	newAttendee.save(function(err, data){
		res.send(data);
	})
});

module.exports = router;