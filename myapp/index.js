var express = require('express');
var studentModel = require('./modules/student');
var router = express();
var path = require('path');
var studentDetails = studentModel.find({});
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(express.static(path.join(__dirname, 'public')));
router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'ejs');




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


router.get('/delete/:id', function (req, res, next) {

  var id = req.params.id;
  var del = studentModel.findByIdAndDelete(id);
  del.exec(function (err) {
    if (err)
      throw err;
    res.redirect("/");
  })

});


router.get('/edit/:id', function (req, res, next) {

  var id = req.params.id;
  var edit = studentModel.findById(id);
  edit.exec(function (err, data) {
    if (err)
      throw err;
    res.render('edit', { title: 'Edit Student Record', records: data });
  })

});

router.post('/update/', function (req, res, next) {

  var id = req.body.id;
  var update = studentModel.findByIdAndUpdate(id,{
    Name: req.body.uname,
    Rollno: req.body.roll,
    email: req.body.email,
    DOB: req.body.dob,
    Address: req.body.address
  });


  update.exec(function (err, data) {
    if (err)
      throw err;
    res.redirect("/")
  })

});



router.listen(process.env.PORT || 3000, function () {
  console.log('Your node js server is running');
});





