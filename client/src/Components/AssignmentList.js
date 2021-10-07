import React, { useState } from "react";
import AssignmentNav from "./AssignmentNav";
import Loading from "./Loading";
import axios from "axios";
import { useEffect } from "react";

export default function AssignmentList() {
  const [uploadedfile, setuploadedfile] = useState("");
  const [loading, setloading] = useState(false);
  const [assignments, setasssignments] = useState([]);

  async function fetchdata() {
    try {
      await axios.get("http://localhost:5000/assignments").then((res) => {
        setasssignments(res.data);
      });
      setloading(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  function handlechange(e) {
    setuploadedfile(e.target.files[0]);
  
  }

  function handlesubmit(e) {
    e.preventDefault();
    console.log(uploadedfile);
    const formdata = new FormData();
    formdata.append("file", uploadedfile);
    formdata.append('rollno' , 11801092);
    formdata.append('group' , "4CE-3");
    axios
      .post("http://localhost:5000/upload",formdata,
       {
         headers :{
          'Content-Type' : 'multipart/form-data'
         }
       }
       )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="assignment-list-container">
        <AssignmentNav />
        <br />
        <br />
        <h1>Assignments</h1>
        <br />
        {loading ? (
          <div className="list">
            {assignments.map((assignment, index) => {
              return (
                <div key={index} id="list-item" className="list-item">
                  <div className="chapterandtime">
                    <div>
                      <h2>{assignment.Subject}</h2>
                      <p>{assignment.Title}</p>
                      <h4>{assignment.Type}</h4>
                    </div>
                    <h4 className="time">
                      Submission Date :<p>{assignment.SubmissionDate}</p>
                    </h4>
                  </div>
                  <input
                    type="file"
                    onChange={handlechange}
                    id="upload"
                    hidden
                  />
                  <label className="upload" for="upload">
                    Upload
                  </label>
                  <button onClick={handlesubmit} className="submit">
                    Submit
                  </button>
                  <br />
                </div>
              );
            })}
          </div>
        ) : (
          <Loading margintop="100px" />
        )}
      </div>
    </div>
  );
}
