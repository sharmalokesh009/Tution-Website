import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { HashRouter as Router, useHistory, Link } from "react-router-dom";
import NoDataIcon from "../Icons/NoDataIcon";
export default function AlltypeAssignments(props) {
  const [loading, setloading] = useState(false);
  const [assignments, setasssignments] = useState([]);
  const first3assignments = assignments.filter((assignment, index) => {
    return index < 3;
  });

  axios.defaults.withCredentials = true;
  const history = useHistory();
  useEffect(() => {
    axios
      .get("https://tuitionwebsite.herokuapp.com/studentlogins")
      .then((res) => {
        const loggedin = res.data.loggedin;
        if (!loggedin) {
          history.push("/");
        }
      });
  }, [history]);

  useEffect(() => {
    async function fetchdata() {
      try {
        await axios
          .get(`https://tuitionwebsite.herokuapp.com/${props.type}`)
          .then((res) => {
            setasssignments(res.data);
          });
        setloading(true);
      } catch (e) {
        console.log(e);
      }
    }
    fetchdata();
  }, [assignments, props]);

  return (
    <Router>
      <div className="assignments-stuff">
        <div className="pending-container">
          <h2>
            {props.name} <p>{assignments.length}</p>
          </h2>
          {loading ? (
            first3assignments.length === 0 ? (
              <p style={{ textAlign: "center",color:"red" , fontWeight:"bolder" }}>
                <NoDataIcon />
                <br />
                No Assignments
              </p>
            ) : (
              <div className="pending-works">
                {first3assignments.map((assignment, index) => {
                  return (
                    <Link key={index} className="assignment"
                      style={{ textDecoration: "none" }}
                      to={`/${props.to}`}
                    >
                      {assignment.Marks ? <div id="assignment-details" className="assignment-details" >
                        <div>
                        <h3>{assignment.Subject}</h3>
                        <p>{assignment.Title}</p>
                        <h4>{assignment.Type}</h4>
                        </div>
                        <p className="marks"><p style={{color:"lightgreen"}}>{assignment.Marks}</p>/{assignment.TotalMarks}</p>
                      </div> : 
                      <div className="assignment-details" >
                      <div>
                      <h3>{assignment.Subject}</h3>
                      <p>{assignment.Title}</p>
                      <h4>{assignment.Type}</h4>
                      </div>
                    </div>}
                      
                      
                    </Link>
                  );
                })}

                {assignments.length > 3 ? (
                  <Link className="see-all" to={`/${props.to}`}>See all</Link>
                ) : null}
              </div>
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </Router>
  );
}
