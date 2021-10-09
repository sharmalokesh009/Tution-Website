import React from "react"
import { HashRouter as Router , Link } from "react-router-dom"

export default function Navbar(){
    
    return <Router>
        <div className="navbar-container">
        <div className="navbar">
            <Link to='/student' >Home</Link>
            <Link to='/contact' >Contact</Link>
            <Link to='/about' >About</Link>
        </div>
    </div>
    </Router>
}