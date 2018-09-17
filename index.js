var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var Users = [
  {
    username: "admin",
    password: "admin"
  }
];

var students = [
  { StudentID: "1", Name: "Kailash", Department: "Computer Science" },
  { StudentID: "2", Name: "Bharat", Department: "Software" },
  { StudentID: "3", Name: "Lakshmy", Department: "Software" }
];

//Route to handle Post Request Call
app.post("/login", function(req, res) {
  // Object.keys(req.body).forEach(function(key){
  //     req.body = JSON.parse(key);
  // });
  // var username = req.body.username;
  // var password = req.body.password;
  console.log("Inside Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      res.cookie("cookie", "admin", {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
      req.session.user = user;
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Successful Login");
    }
  });
});
app.post("/userInfo", function(req, res) {
  console.log("\nAdding a student - User Info POST route\n");
  console.log(req.body);
  var newStudent = {
    Name: req.body.name,
    StudentId: req.body.studentId,
    Department: req.body.department
  };
  students.push(newStudent);
  console.log(students);
  res.send(JSON.stringify(students));
  console.log("\nStudent Added Successfully!\n");
});

app.get("/userInfo", function(req, res) {
  console.log("User Report Page");
  res.writeHead(200, {
    "Content-Type": "text"
  });
  res.end("Student added");
});

app.get("/userReport", function(req, res) {
  console.log("User Report Page");
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  console.log("Students : ", JSON.stringify(students));
  res.end(JSON.stringify(students));
});

app.post("/userReport", function(req, res) {
  console.log("\nDeleting a student - User Info POST route\n");
  var index = students
    .map(function(student) {
      return students.StudentID;
    })
    .indexOf(req.body.studentId);

  if (index === -1) {
    console.log("Student not found!");
  } else {
    students.splice(index, 1);
    console.log(
      "\nStudent : " + req.body.studentId + " was removed successfully\n"
    );
    res.end(JSON.stringify(students));
  }
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");