import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { HashRouter as Router, Link } from "react-router-dom";
export default function AlltypeAssignments(props){

    const [loading, setloading] = useState(false);
  const [assignments, setasssignments] = useState([]);
  const first3assignments = assignments.filter((assignment, index) => {
    return index < 3;
  });

  

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
  }, [assignments,props]);

    return <Router>
        <div className="assignments-stuff">
    <div className="pending-container">
      <h2>
        {props.name} <p>{assignments.length}</p>
      </h2>
      {loading ? (
        first3assignments.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>No Assignments</h1>
        ) : (
          <div className="pending-works">
            {first3assignments.map((assignment, index) => {
              return (
                <div key={index}>
                  <h3>{assignment.Subject}</h3>
                  <p>{assignment.Title}</p>
                  <h4>{assignment.Type}</h4>
                </div>
              );
            })}

            <Link to={`/${props.to}`}>See all</Link>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  </div>
    </Router>
}