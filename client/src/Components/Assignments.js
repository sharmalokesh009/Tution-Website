import React from "react";
import { HashRouter as Router,Link } from "react-router-dom";
import AssignmentNav from "./AssignmentNav";

export default function Assignments() {

  

  return (
    <Router>
        <div className="assignments-container">
     <AssignmentNav/>
      <div className="assignments-stuff">
        <div className="pending-container">
          <h2>
            Assignments <p>15</p>
          </h2>
          <div className="pending-works">
              <div>
                  <h3>Physics</h3>
                  <p>Chapter 2 Motions</p>
                  <h4>ASSIGNMENT</h4>
              </div>
              <div>
                  <h3>Chemistry</h3>
                  <p>Chapter 7 Chemical Reactions</p>
                  <h4>PPT</h4>
              </div>
              <div>
                  <h3>Physics</h3>
                  <p>Chapter 2 Motions</p>
                  <h4>CHART</h4>
              </div>
             <Link to='/pending'>See all</Link>
          </div>
        </div>
        <div className="subjects-container">
            <h2>Subjects</h2>
            <div className="subjects">
                <div>
                    <h2>English</h2>
                </div>
                <div>
                    <h2>Maths</h2>
                </div>
                <div>
                    <h2>Chemistry</h2>
                </div>
                <div>
                    <h2>Physics</h2>
                </div>
                <Link to='/subjects' >See all</Link>
            </div>
        </div>
      </div>
    </div>
    </Router>
  );
}
