import React from "react";
import "../App.scss";

const display = props => {
    return (
        <div className="Display">
            <div>{props.exp}</div>
            <div>{props.out}</div>
        </div>
    );
};

export default display;
