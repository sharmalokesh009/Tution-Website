import React, { useState } from "react";
import Progress from "./Progess";
import axios from "axios";

export default function AssignAsssignment() {
  const [studentclass, setstudentclass] = useState("");
  const [subject, setsubject] = useState("");
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [marks, setmarks] = useState("");
  const [submissiondate , setsubmissiondate] = useState("");
  const [description, setdescription] = useState("");
  const [asssigned, setassigned] = useState(false);
  const assignmentdetails = {
    Studentclass: studentclass,
    Subject: subject,
    Title: title,
    Type: type,
    Marks: marks,
    SubmissionDate : submissiondate,
    Description: description,
  };
  const details = [
    assignmentdetails.Studentclass,
    assignmentdetails.Subject,
    assignmentdetails.Title,
    assignmentdetails.Type,
    assignmentdetails.Marks,
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

  function handlesubmissiondate(e){
   setsubmissiondate(e.target.value)
  }

  function handletype(e) {
    const value = e.target.value;
    settype(value);
  }

  function handledescription(e) {
    const value = e.target.value;
    setdescription(value);
  }

  function handleassign(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/assign", assignmentdetails);
    if (studentclass.length === 0) {
      alert("Choose a class");
    }
    if (subject.length === 0) {
      alert("Choose a Subject");
    }
    if (title.length === 0) {
      alert("Title is necessary");
    }
    if (type.length === 0) {
      alert("Choose a type");
    }
    if (marks.length === 0) {
      alert("Marks cannot be empty");
    }
    for (var i = 0; i <= details.length - 1; i++) {
      console.log(details[i].length);
      if (details[i].length === 0) {
        setassigned(false);
      }
      if (details[i].length >= 1) {
        setassigned(true);

        setTimeout(() => {
          document.getElementById("assign-container").innerHTML =
            "<h1>Assignment is Successfully Assigned.<br/></h1>";
        }, 2000);
      }
    }
  }

  return (
    <div id="assign-container" className="assignassignment-container">
      <h1>Fill in the details of Assignment</h1>
      <br />
      <div className="assign-form">
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
            <input onChange={handlesubmissiondate} className="dateinput" type="date" />
          </span>
          <span className="description">
            <textarea
              onChange={handledescription}
              rows="6"
              cols="46"
              placeholder="Description about Assignment"
            />
          </span>
          <button onClick={handleassign}>
            {asssigned ? <Progress /> : "Assign"}
          </button>
        </form>
      </div>
    </div>
  );
}
