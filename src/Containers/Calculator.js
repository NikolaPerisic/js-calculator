import React, { Component } from "react";
import "../App.scss";
import Controls from "../Components/Controls";

class Calculator extends Component {
    state = {
        calc: {
            expression: 0,
            output: 0
        },
        clear: "C",
        mod: "%",
        divide: "/",
        multiply: "*",
        seven: 7,
        eight: 8,
        nine: 9,
        subtract: "-",
        four: 4,
        five: 5,
        six: 6,
        add: "+",
        one: 1,
        two: 2,
        three: 3,
        decimal: ".",
        zero: 0,
        delete: "CR",
        equals: "="
    };
    render() {
        const controls = Object.entries(this.state).map(([key, val]) => {
            if (key !== "calc") {
                console.log(val);
                return (
                    <Controls
                        inputs={val}
                        clicked={this.inputHandler}
                        id={key}
                        key={key}
                    />
                );
            } else return null;
        });
        return (
            <div className="Calc">
                <div className="Display">display</div>
                {controls}
            </div>
        );
    }
}

export default Calculator;