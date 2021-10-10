import React from "react"

export default function Loading(props){
    return <div className="loading-container" style={{marginTop:props.margintop ,position:"relative", left : props.left}}>
        <div className="loading-icon">
        </div>
    </div>
}