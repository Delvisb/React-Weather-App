import React from "react";
import '../static/styles.css';

export default function SpinnerComponent(){
    return(
        <div className="spinner-container">
            <p className="text1">Loading...</p>
            <div className="loading-spinner"></div>
        </div>
    )
}