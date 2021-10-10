import React from "react"
import AssignmentList from "./AssignmentList";
import AssignmentNav from "./AssignmentNav";

export default function AssignmentListType(){
    return <div>
        <AssignmentNav />
        <br />
        <br />
        <AssignmentList type="assignments" />
    </div>
}