const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
app.use(express.json())
app.use(cors());


mongoose.connect("mongodb+srv://Lokesh:lokesh12@cluster0.r2lwk.mongodb.net/DAV?retryWrites=true&w=majority")

const AssignmentSchema = new mongoose.Schema({
    Studentclass : String,
    Subject : String,
    Title : String,
    Type : String,
    Marks : Number,
    SubmissionDate : String,
    Description : String
})


const SubmittedAssignments = new mongoose.Schema({
    RollNo : Number,
    Group : String,
    Subject : String,
    Title : String,
    Type : String,
    SubmissionDate:String,
    File : Object
})



const assignments = mongoose.model('Assignments' , AssignmentSchema)
const submittedassignments = mongoose.model('Submitted Assignments' , SubmittedAssignments)
const approvedassignments = mongoose.model('Approved Assignments', SubmittedAssignments )
const declinededassignments = mongoose.model('Declined Assignments', SubmittedAssignments )


app.get('/assignments' , (req,res) => {
    assignments.find({} , (err,results) => {
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    })
})

app.get('/submitted' , (req,res) => {
    submittedassignments.find({} , (err , results) => {
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    })
})

app.post('/upload', (req, res) => {
    console.log(req.body);
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    
   if(req.body.array === "assignments"){
    assignments.deleteOne({_id : req.body.Id} , (err) => {
        console.log(err);
    })
   }
    if(req.body.array === "declined"){
    declinededassignments.deleteOne({_id : req.body.Id} , (err) => {
        if(err){
            console.log(err);
        }
    })
}
    const file = req.files.file;
    const assignmentdetails = {
        RollNo : req.body.rollno,
        Group : req.body.group,
        Subject : req.body.subject,
        Title : req.body.title,
        Type : req.body.type,
        SubmissionDate:req.body.submissiondate, 
        File : file
    }
     submittedassignments.insertMany(assignmentdetails , (err) => {
         if(err){
             console.log(err);
         }
         if(!err){
             res.send("Submitted")
         }
     })
  });

app.post('/approved' , (req,res) => {
    submittedassignments.findById({_id : req.body.Id} , (err,results) => {
        if(!err){
            submittedassignments.deleteOne({_id : req.body.Id} , (err) => {
                console.log(err);
                
            })
            approvedassignments.insertMany(results , (err) => {
                if(!err){
                    res.send("Deleted and Approved")
                    
                }
            })
            
        }
    })
})

app.get('/declined' , (req,res) => {
    declinededassignments.find({} , (err,results) => {
        res.send(results);
    })
})

app.post('/declined' , (req,res) => {
    submittedassignments.findById({_id : req.body.Id} , (err,results) => {
        if(!err){
            submittedassignments.deleteOne({_id : req.body.Id} , (err) => {
                console.log(err);
            })
            declinededassignments.insertMany(results , (err) => {
                if(!err){
                    res.send("Declined")
                }
            })
            
        }
    })
})




app.post('/assign' , (req,res) => {
    assignments.insertMany(req.body , (err) => {
        if(err){
            console.log(err);
        }else{
            res.send("Inserted Successfully");
            
        }
    })
})

app.listen(5000 , () => {
    console.log("Server Started");
})