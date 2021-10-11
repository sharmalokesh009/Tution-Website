import React from "react"
import AssignmentList from "./AssignmentList";
import AssignmentNav from "./AssignmentNav";

export default function Declined(){
    return <div>
        <AssignmentNav />
        <br />
        <br />
        <AssignmentList type="declined" name="Declined Assignments" array="declined" />
    </div>
}