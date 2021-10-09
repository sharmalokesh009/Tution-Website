import React from "react";
import Assignment from "./Assignment";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import AssignmentNav from "./AssignmentNav";

export default function AssignmentList() {
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
  }, [assignments]);

  return (
    <div>
        <AssignmentNav />
        <br />
        <br />
        <h1 style={{textAlign:"center"}} >Assignments</h1>
        {loading ?<div>
      {assignments.map((assignment, index) => {
        return <Assignment key={index} 
        currentindex={index} 
        id={assignment._id} 
        Subject={assignment.Subject}
        Title={assignment.Title}
        Type={assignment.Type}
        SubmissionDate={assignment.SubmissionDate}
        index={index}
        />;
      })}
      </div>:<Loading/> }
      
    </div>
  );
}
