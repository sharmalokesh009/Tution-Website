import React from "react";
import Assignment from "./Assignment";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import NoDataIcon from "../Icons/NoDataIcon";
import { useHistory } from "react-router";


export default function AssignmentList(props) {
  const [loading, setloading] = useState(false);
  const [assignments, setasssignments] = useState([]);
const [assignmentsempty , setassignmentsempty] = useState(false);
axios.defaults.withCredentials = true;
const history = useHistory();
  useEffect(() => {
    axios.get('http://localhost:5000/studentlogins').then(res => {
      const loggedin = res.data.loggedin;
      if(!loggedin){
        history.push('/')
      }
    })
  },[history])

  useEffect(() => {
    async function fetchdata() {
      try {
        await axios.get(`http://localhost:5000/${props.type}`).then((res) => {
          setasssignments(res.data);
          if(res.data.length === 0){
            setassignmentsempty(true)
          }
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
        <h1 style={{textAlign:"center"}} >{props.name}</h1>
        {loading ?
        assignmentsempty ? <h2 style={{color:"red" , textAlign:"center" }} ><br/><NoDataIcon/><br/>No Data</h2> : <div>
        {assignments.map((assignment, index) => {
          return <Assignment key={index} 
          currentindex={index} 
          id={assignment._id} 
          Subject={assignment.Subject}
          Title={assignment.Title}
          Type={assignment.Type}
          SubmissionDate={assignment.SubmissionDate}
          index={index}
          array = {props.type}
          />;
        })}
        </div>
        :<Loading/> }
      
    </div>
  );
}
