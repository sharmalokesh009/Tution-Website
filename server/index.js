const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser')
const session = require("express-session");
const cookieparser = require("cookie-parser")

const SaltRounds = 10;
const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:3000","https://dav-school-afe85.web.app"],
    methods : ["GET" , "POST"],
    credentials : true
}));

app.use(cookieparser());
app.use(bodyParser.urlencoded({extended:true}) )
app.set("trust proxy", 1);

app.use(session({
    key : "userid",
    secret : "thisismysecret",
    resave : false,
    saveUninitialized : false,
    cookie : {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        expires : 1000 * 60 * 60 * 24
    }
}));

mongoose.connect(
  process.env.URL
);

const AssignmentSchema = new mongoose.Schema({
  Studentclass: String,
  Subject: String,
  Title: String,
  Type: String,
  TotalMarks : Number,
  SubmissionDate: String,
  Description: String,
});

const SubmittedAssignments = new mongoose.Schema({
  RollNo: Number,
  Group: String,
  Subject: String,
  Title: String,
  Type: String,
  SubmissionDate: String,
  Marks : Number,
  TotalMarks : Number,
  File: Object,
});

const LoginSchema = new mongoose.Schema({
  Username: String,
  Password: String,
});

const assignments = mongoose.model("Assignments", AssignmentSchema);
const submittedassignments = mongoose.model(
  "Submitted Assignments",
  SubmittedAssignments
);
const approvedassignments = mongoose.model(
  "Approved Assignments",
  SubmittedAssignments
);
const declinededassignments = mongoose.model(
  "Declined Assignments",
  SubmittedAssignments
);
const Studentlogins = mongoose.model("StudentLogins", LoginSchema);
const Stafflogins = mongoose.model("StaffLogins", LoginSchema);
const RegisteredStudents = mongoose.model("RegisteredStudents", LoginSchema);

app.post("/student", (req, res) => {
  RegisteredStudents.find({ Username: req.body.Username }, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!err) {
      bcrypt.hash(req.body.Password, SaltRounds, (err, hash) => {
          if(err){
              console.log(err);
          }
          if(!err){
              console.log(results);
              bcrypt.compare(results[0].Password , hash , (err,ismatch) => {
                  if(err){
                      console.log(err);
                  }else{
                      req.session.user = results;
                      console.log(req.session.user);
                      console.log(ismatch);
                      res.send(ismatch);
                  }
              })
          }
      });
    }
  });
});

app.get('/studentlogins' , (req,res) => {
    if(req.session.user){
        res.send({
            loggedin : true,
        });
    }else{
        res.send({
            loggedin : false,
        });
    }
})
app.post("/staff", (req, res) => {
  console.log(req.body);
  Stafflogins.insertMany(req.body, (err) => {
    if (err) {
      console.log(err);
    }
    if (!err) {
      res.send("Inserted");
    }
  });
});

app.get("/assignments", (req, res) => {
  assignments.find({}, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.get("/submitted", (req, res) => {
  submittedassignments.find({}, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.post("/upload", (req, res) => {
  console.log(req.body);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  if (req.body.array === "assignments") {
    assignments.deleteOne({ _id: req.body.Id }, (err) => {
      console.log(err);
    });
  }
  if (req.body.array === "declined") {
    declinededassignments.deleteOne({ _id: req.body.Id }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  const file = req.files.file;
  const assignmentdetails = {
    RollNo: req.body.rollno,
    Group: req.body.group,
    Subject: req.body.subject,
    Title: req.body.title,
    Type: req.body.type,
    TotalMarks : req.body.totalmarks,
    SubmissionDate: req.body.submissiondate,
    File: file,
  };
  submittedassignments.insertMany(assignmentdetails, (err) => {
    if (err) {
      console.log(err);
    }
    if (!err) {
      res.send("Submitted");
    }
  });
});

app.post("/approved", (req, res) => {
  submittedassignments.findById({ _id: req.body.Id }, (err, results) => {
    if (!err) {
      submittedassignments.deleteOne({ _id: req.body.Id }, (err) => {
        console.log(err);
      });
      approvedassignments.insertMany({
        RollNo: results.RollNo,
  Group: results.Group,
  Subject: results.Subject,
  Title: results.Title,
  Type: results.Type,
  SubmissionDate: results.SubmissionDate,
  Marks : req.body.Marks,
  TotalMarks : results.TotalMarks,
  File: results.File,
      }, (err) => {
        if (!err) {
          res.send("Deleted and Approved");
        }
      });
    }
  });
});

app.get("/declined", (req, res) => {
  declinededassignments.find({}, (err, results) => {
    res.send(results);
  });
});
app.get("/approved", (req, res) => {
  approvedassignments.find({}, (err, results) => {
    res.send(results);
  });
});


app.post("/declined", (req, res) => {
  submittedassignments.findById({ _id: req.body.Id }, (err, results) => {
    if (!err) {
      submittedassignments.deleteOne({ _id: req.body.Id }, (err) => {
        console.log(err);
      });
      declinededassignments.insertMany(results, (err) => {
        if (!err) {
          res.send("Declined");
        }
      });
    }
  });
});

app.post("/assign", (req, res) => {
  assignments.insertMany(req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Inserted Successfully");
    }
  });
});

app.listen( process.env.PORT || 5000, () => {
  console.log("Server Started");
});
