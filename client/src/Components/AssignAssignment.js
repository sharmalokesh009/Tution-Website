import React, { useEffect, useState } from "react";
import axios from "axios";
import Progress from "./Progess";
import AssignedIcon from "../Icons/AssignedIcon";
import { useHistory } from "react-router";

export default function AssignAsssignment() {

  
  const history = useHistory();
  useEffect(() => {
    
    axios.get('https://tuitionwebsite.herokuapp.com/studentlogins').then(res => {
      const loggedin = res.data;
      console.log(res);
      if(!loggedin){
        history.push('/')
      }
    })
  },[history])
  const [studentclass, setstudentclass] = useState("");
  const [subject, setsubject] = useState("");
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [marks, setmarks] = useState("");
  const [submissiondate, setsubmissiondate] = useState("");
  const [description, setdescription] = useState("");
  const [asssigned, setassigned] = useState(false);
  const [progress, setprogress] = useState(false);
  const assignmentdetails = {
    Studentclass: studentclass,
    Subject: subject,
    Title: title,
    Type: type,
    TotalMarks: marks,
    SubmissionDate: submissiondate,
    Description: description,
  };
  const details = [
    assignmentdetails.Studentclass,
    assignmentdetails.Subject,
    assignmentdetails.Title,
    assignmentdetails.Type,
    assignmentdetails.TotalMarks,
  ];
  function handlestudentclass(e) {
    const value = e.target.value;
    setstudentclass(value);
  }
  function handlesubject(e) {
    const value = e.target.value;
    setsubject(value);
  }

  function handletitle(e) {
    const value = e.target.value;
    settitle(value);
  }

  function handlemarks(e) {
    const value = e.target.value;
    setmarks(value);
  }

  function handlesubmissiondate(e) {
    setsubmissiondate(e.target.value);
  }

  function handletype(e) {
    const value = e.target.value;
    settype(value);
  }

  function handledescription(e) {
    const value = e.target.value;
    setdescription(value);
  }


  const sendPostRequest = async () => {
    try {
      setprogress(true)
      const resp = await axios.post(
        "https://tuitionwebsite.herokuapp.com/assign",
        assignmentdetails
      );
      console.log(resp.data);
      setprogress(false);
      setassigned(true)
    } catch (err) {
     
      console.error(err);
    }
  };



  function handleassign(e) {
    e.preventDefault();

    var length = 0;
    for (var i = 0; i <= details.length - 1; i++) {
      length = length + details[i].length;
    }
    if (length === 0) {
      alert("No input given !");
    }
    if (length >= 1) {
      sendPostRequest();
      
    }
  }

  return (
    <div id="assign-container" className="assignassignment-container">
      <h1>Fill in the details of Assignment</h1>
      <br />
      <div className="assign-form">
        {asssigned ? (
          <h1 className="assigned">
            Assigned
            <br />
            <AssignedIcon/>
            <p
              className="goback"
              onClick={() => {
                setassigned(false);
                window.location.reload();
              }}
            >
              Go Back
            </p>
          </h1>
        ) : (
          <form>
            <span>
              <label>Class to Assign for : &nbsp;</label>
              <select onChange={handlestudentclass}>
                <option>Class</option>
                <option value="10+1 A">10+1th (A)</option>
                <option value="10+1 A">10+1th (B)</option>
                <option value="10+2 A">10+2th (A)</option>
                <option value="10+2 B">10+2th (B)</option>
              </select>
            </span>

            <span>
              <label>Choose a Subject : &nbsp;</label>
              <select onChange={handlesubject}>
                <option>Subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
                <option value="Biology">Biology</option>
              </select>
            </span>
            <span>
              <label>Title : &nbsp;</label>
              <input onChange={handletitle} type="text" required />
            </span>
            <span>
              <label>Type : &nbsp;</label>
              <select onChange={handletype}>
                <option>Type</option>
                <option value="Assignment">ASSIGNMENT</option>
                <option value="Report">REPORT</option>
                <option value="PPT">PPT</option>
              </select>
            </span>
            <span>
              <label>Marks :&nbsp;</label>
              <input
                onChange={handlemarks}
                className="marks"
                type="Number"
                required
              />
            </span>
            <span>
              <label>Last Date for Submission :&nbsp;</label>
              <input
                onChange={handlesubmissiondate}
                className="dateinput"
                type="date"
              />
            </span>
            <span className="description">
              <textarea
                onChange={handledescription}
                rows="6"
                cols="30"
                placeholder="Description about Assignment"
              />
            </span>
            <button onClick={handleassign}>
              {progress ? <Progress /> : "Assign"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
