import React from "react";
import "../App.scss";

const display = props => {
    return (
        <div className="Display">
            <div className="Brand">casio</div>
            <div className="Expression">{props.exp}</div>
            <div className="Output">{props.out}</div>
        </div>
    );
};

export default display;
