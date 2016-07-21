var mongoose = require('mongoose');

var attendeeSchema = mongoose.Schema({
	name: String,
	comment: String
});

module.exports = mongoose.model('Attendee', attendeeSchema);
