var  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/student', {useNewUrlParser: true, useUnifiedTopology: true});


var db = mongoose.connection;

var studentSchema = new mongoose.Schema({
    Name: String,
    Rollno:Number,
    email: String,
    DOB:String,
    Address:String

});

var studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;