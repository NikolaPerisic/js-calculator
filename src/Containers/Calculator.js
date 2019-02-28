import React, { Component } from "react";
import "../App.scss";
import Controls from "../Components/Controls";
import Display from "../Components/Display";
import Data from "../assets/Data/Data";

class Calculator extends Component {
    state = { ...Data };

    inputHandler = el => {
        const item = el.currentTarget.textContent;
        const data = { ...this.state.calc };
        const lastChar = data.expression.charAt(data.expression.length - 1);

        if (item === "DEL") return this.deleteHandler(lastChar);
        if (item === "C") return this.clearAllHandler();
        if (item === "=") return this.expressionHandler(data.expression);

        if (data.expression === "0") {
            if (!isNaN(parseInt(item))) {
                data.expression = item;
                data.output = item;
            } else {
                data.expression += item;
            }
        } else {
            if (!isNaN(parseInt(item)) && !isNaN(parseInt(lastChar))) {
                data.expression += item;
                data.output += item;
            } else if (!isNaN(parseInt(item)) && isNaN(parseInt(lastChar))) {
                data.expression += item;
                data.output = item;
            } else if (isNaN(parseInt(item)) && !isNaN(parseInt(lastChar))) {
                data.expression += item;
            } else {
                data.expression = data.expression.substring(
                    0,
                    data.expression.length - 1
                );
                data.expression += item;
            }
        }
        this.setState({ calc: data });
        return null;
    };
    deleteHandler = lastChar => {
        const data = { ...this.state.calc };
        if (data.output.length > 1 && !isNaN(parseInt(lastChar))) {
            data.output = data.output.substring(0, data.output.length - 1);
            data.expression = data.expression.substring(
                0,
                data.expression.length - 1
            );
        } else if (
            (data.output.length > 1 && isNaN(parseInt(lastChar))) ||
            data.output.length === 1
        ) {
            return this.clearAllHandler();
        }
        return this.setState({ calc: data });
    };
    clearAllHandler = () => {
        return this.setState({ calc: Data.calc });
    };
    expressionHandler = str => {
        console.log(str);
    };
    render() {
        const controls = Object.entries(this.state).map(([key, val]) => {
            if (key !== "calc") {
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
                <Display
                    exp={this.state.calc.expression}
                    out={this.state.calc.output}
                />
                {controls}
            </div>
        );
    }
}

export default Calculator;
