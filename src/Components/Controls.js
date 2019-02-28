import React from "react";
import "../App.scss";

const controls = props => {
    return (
        <button
            className="Inputs"
            id={props.id}
            onClick={props.clicked}
            disabled={props.active}
            value={props.inputs}
        >
            {props.inputs.replace("*", "x").replace("/", "÷")}
        </button>
    );
};

export default controls;
