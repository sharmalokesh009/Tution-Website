import React from "react";
import Form from "./Components/Form";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Studenthome from "./Components/Studenthome";
import Footer from "./Components/Footer";
import Assignments from "./Components/Assignments";
import Staffhome from "./Components/Staffhome";
import AssignAsssignment from "./Components/AssignAssignment";
import SubmittedAssignments from "./Components/SubmittedAssignments";
import AssignmentListType from "./Components/AssignmentListType";
import Declined from "./Components/Declined";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/" exact>
            <Form staffdisplay="none" studentdisplay="none" />
          </Route>
          <Route path="/staff">
            <Form
              staffandstudentdisplay="none"
              studentdisplay="none"
              path="staffhome"
            />
          </Route>
          <Route path="/student">
            <Form
              staffandstudentdisplay="none"
              staffdisplay="none"
              path="studenthome"
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
