var express = require('express');
var studentModel = require('../modules/student');
var router = express.Router();
var studentDetails = studentModel.find({});



/* GET home page. */
router.get('/', function (req, res, next) {
  studentDetails.exec(function (err, data) {
    if (err)
      throw err;
    res.render('index', { title: 'Student Records', records: data });
  })

});



router.post("/", function (req, res, next) {


  var student = new studentModel({
    Name: req.body.uname,
    Rollno: req.body.roll,
    email: req.body.email,
    DOB: req.body.dob,
    Address: req.body.address
  })

  student.save(function (err, data1) {
    if (err)
      throw err;
    studentDetails.exec(function (err, data) {
      if (err)
        throw err;
      res.render('index', { title: 'Student Records', records: data });
    })
  });


});

router.post("/search/", function (req, res, next) {

  var filterName = req.body.byname;
  var filterRoll = req.body.byroll;
  var filterAddress = req.body.byaddress;

  if (filterName != '' && filterRoll != '' && filterAddress != '') {
    var filterParameter = {
      $and: [{ Name: filterName }, { $and: [{ Rollno: filterRoll }, { Address: filterAddress }] }]
    }
  } else if (filterName != '' && filterRoll == '' && filterAddress != '') {

    var filterParameter = {
      $and: [{ Name: filterName }, { Address: filterAddress }]
    }
  } else if (filterName == '' && filterRoll != '' && filterAddress != '') {
    var filterParameter = {
      $and: [{ Rollno: filterRoll }, { Address: filterAddress }]
    }
  } else {
    var filterParameter = {}
  }

  var studentFilter = studentModel.find(filterParameter);


studentFilter.exec(function (err, data) {
  if (err)
    throw err;
  res.render('index', { title: 'Student Records', records: data });
})

});


module.exports = router;
