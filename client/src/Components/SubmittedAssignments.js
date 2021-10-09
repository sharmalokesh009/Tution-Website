import React, { useEffect, useState } from "react";
import axios from "axios";
import ApproveIcon from "../Icons/ApproveIcon";
import DeclineIcon from "../Icons/DeclineIcon";
import Loading from "./Loading";
import DownloadIcon from "../Icons/DownloadIcon";

export default function SubmittedAssignments() {
  const [loading, setloading] = useState(false);
  const [assignments, setassignments] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    try {
      await axios
        .get("http://localhost:5000/submitted")
        .then((res) => {
          console.log(res.data);
          setassignments(res.data);

          setloading(true);
        });
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="submitted-container">
      <h1>Recently Submitted Assignments</h1>
      {loading ? (
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
            {assignments.map((assignment, index) => {
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
                      <DownloadIcon/>
                    </a>
                  </td>
                  <td><input type="number" /></td>
                  <td>
                    <p onClick={() => {
                       axios.post('http://localhost:5000/approved' , {
                        Id : assignment._id
                      })
                    }} ><ApproveIcon/></p>
                    <p><DeclineIcon/></p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </div>
  );
}
