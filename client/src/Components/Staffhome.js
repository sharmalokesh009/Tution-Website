import React from "react"
import {  HashRouter as Router , Link } from "react-router-dom"
import AssignIcon from "../Icons/AssignIcon"

export default function Staffhome(){
    return <Router>
        <div className="staffhome-container">
        <div className="staffhome-items">
            <div>
                <Link to='/submitted' >Recently <br/>Submitted</Link>
            </div>
            <div>
                <Link to='/' >Pending <br/> Assignments</Link>
            </div>
            <div>
                <Link to='/' >Student's <br/> List</Link>
            </div>
            <div>
                <Link to='/assign' >Assign<br/><AssignIcon/></Link>
            </div>

        </div>
    </div>
    </Router>
}