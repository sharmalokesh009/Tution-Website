import React, { useEffect, useState } from "react";
import axios from "axios";
import ApproveIcon from "../Icons/ApproveIcon";
import DeclineIcon from "../Icons/DeclineIcon";
import Loading from "./Loading";
import DownloadIcon from "../Icons/DownloadIcon";
import NoDataIcon from "../Icons/NoDataIcon";
import {useHistory } from "react-router";

export default function SubmittedAssignments() {
  const [loading, setloading] = useState(false);
  const [assignments, setassignments] = useState([]);
  const [progress, setprogress] = useState(false);
  const [progress2, setprogress2] = useState(false);
  const [assignmentsempty, setassignmentsempty] = useState(false);
  const [marks , setmarks] = useState(Number);
 const history = useHistory();
  


const currentwidth = document.querySelector('body').scrollWidth;


useEffect(() => {
    
  axios.get('https://tuitionwebsite.herokuapp.com/studentlogins').then(res => {
    const loggedin = res.data;
    if(!loggedin){
      history.push('/')
    }
  })
},[history])
  useEffect(() => {
    fetchdata();
  }, [assignments]);

  async function fetchdata() {
    try {
      await axios.get("https://tuitionwebsite.herokuapp.com/submitted").then((res) => {
        setassignments(res.data);
        if (res.data.length === 0) {
          setassignmentsempty(true);
        }
        setloading(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handlemarks(e){
    setmarks(e.target.value);
  }

  return (
    <div className="submitted-container">
      <h1 style={{ textDecoration: "underline" }}>
        Recently Submitted Assignments
      </h1>
      {loading ? (
        assignmentsempty ? (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bolder",
            }}
          >
            <NoDataIcon/><br/>
            No Assignments Submmitted
          </p>
        ) : (
         currentwidth <= 500 ? progress2 ? (
          <Loading left="0px" />
        ) : (
          assignments.map((assignment, index) => {
            return (
              <div key={index} className="about-assignment">
                <div className="info">
                <p>{assignment.RollNo}</p>
                <p>{assignment.Group}</p>
                <a
                       download={assignment.RollNo}
                       href={`data:${assignment.File.mimetype};base64,${assignment.File.data}`}
                     >
                       <DownloadIcon />
                     </a>
                </div>
                <div>
                <input className="marks" type="number" onChange={handlemarks} />
                     <p
                       onClick={async () => {
                         setprogress2(true);
                         await axios
                           .post("https://tuitionwebsite.herokuapp.com/approved", {
                             Id: assignment._id,
                             Marks : marks
                           })
                           .then((res) => {
                             
                             setprogress(false);
                           });
                       }}
                     >
                       <ApproveIcon />
                     </p>
                     <p
                       onClick={async () => {
                         setprogress2(true);
                         await axios
                           .post("https://tuitionwebsite.herokuapp.com/declined", {
                             Id: assignment._id,
                           })
                           .then((res) => {
                            
                             setprogress(false);
                           });
                       }}
                     >
                       <DeclineIcon />
                     </p>
                </div>
              </div>
             
            );
          })
        ) :  <table>
         <tbody>
           <tr>
             <th>Roll No</th>
             <th>Batch</th>
             <th>Subject</th>
             <th>Document</th>
             <th>Marks</th>
             <th>Status</th>
           </tr>
           {progress ? (
             <Loading left="250px" />
           ) : (
             assignments.map((assignment, index) => {
               return (
                 <tr key={index}>
                   <td>{assignment.RollNo}</td>
                   <td>{assignment.Group}</td>
                   <td>{assignment.Subject}</td>
                   <td>
                     <a
                       download={assignment.RollNo}
                       href={`data:${assignment.File.mimetype};base64,${assignment.File.data}`}
                     >
                       <DownloadIcon />
                     </a>
                   </td>
                   <td>
                     <input type="number" onChange={handlemarks} />
                   </td>
                   <td>
                     <p
                       onClick={async () => {
                         setprogress(true);
                         await axios
                           .post("https://tuitionwebsite.herokuapp.com/approved", {
                             Id: assignment._id,
                             Marks : marks
                           })
                           .then((res) => {
                             
                             setprogress(false);
                           });
                       }}
                     >
                       <ApproveIcon />
                     </p>
                     <p
                       onClick={async () => {
                         setprogress(true);
                         await axios
                           .post("https://tuitionwebsite.herokuapp.com/declined", {
                             Id: assignment._id,
                           })
                           .then((res) => {
                             
                             setprogress(false);
                           });
                       }}
                     >
                       <DeclineIcon />
                     </p>
                   </td>
                 </tr>
               );
             })
           )}
           {}
         </tbody>
       </table>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
