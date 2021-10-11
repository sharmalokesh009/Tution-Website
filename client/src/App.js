import React, { useEffect } from "react";
import Form from "./Components/Form";
import { HashRouter as Router, Route, Switch ,useHistory} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Studenthome from "./Components/Studenthome";
import Footer from "./Components/Footer";
import Assignments from "./Components/Assignments";
import Staffhome from "./Components/Staffhome";
import AssignAsssignment from "./Components/AssignAssignment";
import SubmittedAssignments from "./Components/SubmittedAssignments";
import AssignmentListType from "./Components/AssignmentListType";
import Declined from "./Components/Declined";
import axios from "axios";

export default function App() {

  

  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/" exact>
            <Form display="none" />
          </Route>
          <Route path="/staff">
            <Form
              identity="Staff"
              path="staffhome"
              database="staff"
            />
          </Route>
          <Route path="/student">
            <Form
              identity="Student"
              path="studenthome"
              database="student"
            />
          </Route>
          <Route path="/studenthome">
            <Navbar />
            <br />
            <Studenthome />
            <br />
            <Footer />
          </Route>
          <Route path="/staffhome">
            <Navbar />
            <br />
            <Staffhome />
            <br />
            <Footer />
          </Route>
          <Route path="/assignments">
            <Assignments />
          </Route>
          <Route path="/pending">
            <AssignmentListType />
          </Route>
          <Route path="/assign">
            <AssignAsssignment />
          </Route>
          <Route path="/submitted">
            <SubmittedAssignments />
          </Route>
          <Route path='/declined'>
            <Declined/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
