import React from "react";
import "../App.scss";

const controls = props => {
    return (
        <div className="Inputs" id={props.id} onClick={props.clicked}>
            {props.inputs}
        </div>
    );
};

export default controls;
