import React from "react";
import { HashRouter as Router , Link } from "react-router-dom";
export default function Footer(){

    

    return <Router><div className="footer-container">
        <footer>
            <div className="links">
             <Link to='/termsofuse' >Terms of Use</Link>
             <Link to='/privacy' >Privacy</Link>
             <Link to='/cookies' >Cookies</Link>   
            </div>
            <p>© DAV,DELHI</p>
        </footer>
    </div>
    </Router>
}