import React, { useState } from "react";
import Progess from "./Progess";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import StaffIcon from "../Icons/StaffIcon";
import StudentIcon from "../Icons/StudentIcon";
import Progress from "./Progess";

export default function Form(props) {
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  const [usernamefilled, setusernamefilled] = useState("");
  const [passwordfilled, setpasswordfilled] = useState("");

  function handleusername(e) {
    setusernamefilled(e.target.value);
  }
  function handlepassword(e) {
    setpasswordfilled(e.target.value);
  }

  function handleclick(e) {
    e.preventDefault();
    if (usernamefilled === "") {
      alert("Username required !");
    }
    if (passwordfilled === "") {
      alert("Password required !");
    }
    if (usernamefilled !== "" && passwordfilled !== "") {
      setclicked(true);
      setTimeout(() => {
        history.push(`/${props.path}`);
      }, 2000);
    }
  }

  return (
    <Router>
      <div className="form-container">
        <h1>
          Rohit's Tuition Classes
          <br />(RTC)
        </h1>
        <div className="form">
          <Switch>
            <Route path="/" exact>
              <div className="staffandstudent" style={{display:props.staffandstudentdisplay}}>
                <div className="staff">
                  <StaffIcon />
                  <Link to="/staff">Staff</Link>
                </div>
                <div className="student">
                  <StudentIcon />
                  <Link to="/student">Student</Link>
                </div>
              </div>
            </Route>
          </Switch>
          <form style={{display:props.staffdisplay}}>
            <h1>Staff Login</h1>
            <label>Username</label>
            <input type="text" onChange={handleusername} required />
            <label>Password</label>
            <input type="password" onChange={handlepassword} required />
            <div className="login" onClick={handleclick}>
              {clicked ? <Progress /> : "Log in"}
            </div>
          </form>

          <form style={{display:props.studentdisplay}}>
            <h1>Student Login</h1>
            <label>Username</label>
            <input type="text" onChange={handleusername} required />
            <label>Password</label>
            <input type="password" onChange={handlepassword} required />

            <div className="login" onClick={handleclick}>
              {clicked ? <Progess /> : "Log in"}
            </div>
          </form>
        </div>
      </div>
    </Router>
  );
}
