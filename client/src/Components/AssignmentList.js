import React from "react";
import Assignment from "./Assignment";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";


export default function AssignmentList(props) {
  const [loading, setloading] = useState(false);
  const [assignments, setasssignments] = useState([]);

  

  useEffect(() => {
    async function fetchdata() {
      try {
        await axios.get(`http://localhost:5000/${props.type}`).then((res) => {
          setasssignments(res.data);
        });
        setloading(true);
      } catch (e) {
        console.log(e);
      }
    }
    fetchdata();
  }, [assignments , props]);

  return (
    <div>
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
