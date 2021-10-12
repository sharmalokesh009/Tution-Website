import React, { useEffect, useState } from "react";
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
import axios from "axios";
import PopUp from "./PopUp";
import CancelIcon from "../Icons/CancelIcon";

export default function Form(props) {
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  const [wrongpassword , setwrongpassword] = useState(false)
  const [usernamefilled, setusernamefilled] = useState("");
  const [passwordfilled, setpasswordfilled] = useState("");
  const studentdetails = {
    Username : usernamefilled,
    Password : passwordfilled
}

  function handleusername(e) {
    setusernamefilled(e.target.value);
  }
  function handlepassword(e) {
    setpasswordfilled(e.target.value);
  }

  axios.defaults.withCredentials = true;

  useEffect(() => {
    
    axios.get('http://localhost:5000/studentlogins').then(res => {
      const loggedin = res.data.loggedin;
      if(!loggedin){
        history.push('/')
      }
    })
  },[history])

  async function PostData(){
    try{
      setclicked(true);
      await axios.post(`http://localhost:5000/${props.database}` , studentdetails).then( res => {
        if(res.data){
        setclicked(false);
        history.push(`/${props.path}`);
      }else{
        setclicked(false);
        setwrongpassword(true);
      }
    })
    }
    catch(e){
      console.log(e);
    }
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
      
      PostData();
     
    }
  }

  return (
    <Router>
      <div className="form-container">
        <h1>
          Rohit's Tuition Classes
          <br />(RTC)
        </h1>
        {wrongpassword ? <PopUp text="Wrong Password !" icon={<p onClick={() => {console.log(setwrongpassword(false));}} ><CancelIcon/></p>} /> : <div className="form">
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
          <form style={{display : props.display}}>
            <h1>{props.identity} Login</h1>
            <label>Username</label>
            <input type="text" onChange={handleusername} required />
            <label>Password</label>
            <input type="password" onChange={handlepassword} required />
            <div className="login" onClick={handleclick}>
              {clicked ? <Progress /> : "Log in"}
            </div>
          </form>


        </div>}
      </div>
    </Router>
  );
}
