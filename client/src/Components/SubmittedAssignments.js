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
  const [assignmentsempty, setassignmentsempty] = useState(false);
 const history = useHistory();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:5000/studentlogins').then(res => {
      const loggedin = res.data.loggedin;
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
      await axios.get("http://localhost:5000/submitted").then((res) => {
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
          <table>
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
                        <input type="number" />
                      </td>
                      <td>
                        <p
                          onClick={async () => {
                            setprogress(true);
                            await axios
                              .post("http://localhost:5000/approved", {
                                Id: assignment._id,
                              })
                              .then((res) => {
                                console.log(res);
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
                              .post("http://localhost:5000/declined", {
                                Id: assignment._id,
                              })
                              .then((res) => {
                                console.log(res);
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
