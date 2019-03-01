import React, { Component } from "react";
import "../App.scss";
import Controls from "../Components/Controls";
import Display from "../Components/Display";
import Data from "../assets/Data/Data";
import math from "mathjs";

class Calculator extends Component {
    state = { ...Data };

    inputHandler = el => {
        const item = el.currentTarget.value;
        const data = { ...this.state.calc };
        const lastChar = data.expression.charAt(data.expression.length - 1);

        if (item === "DEL") return this.deleteHandler(lastChar);
        if (item === "C") return this.clearAllHandler();
        if (item === "=") return this.expressionHandler(data.expression);
        if (item === "±") return this.plusMinusHandler(data, lastChar);

        if (
            (item === "." &&
                data.output.indexOf(".") !== -1 &&
                !isNaN(parseInt(lastChar))) ||
            (item === "0" && data.output === "0") ||
            (item === "." && lastChar === ".")
        )
            return null;

        if (item === "." && isNaN(parseInt(lastChar))) {
            data.output = "0.";
            data.expression += "0.";
            return this.setState({ calc: data });
        }

        if (data.expression === "0") {
            if (!isNaN(parseInt(item))) {
                data.expression = item;
                data.output = item;
            } else if (item === ".") {
                data.expression += item;
                data.output += item;
            } else {
                data.expression += item;
            }
        } else if (item === ".") {
            data.expression += item;
            data.output += item;
        } else {
            if (
                (!isNaN(parseInt(item)) && !isNaN(parseInt(lastChar))) ||
                (!isNaN(parseInt(item)) && lastChar === ".")
            ) {
                data.expression += item;
                data.output += item;
            } else if (!isNaN(parseInt(item)) && isNaN(parseInt(lastChar))) {
                data.expression += item;
                data.output = item;
            } else if (isNaN(parseInt(item)) && !isNaN(parseInt(lastChar))) {
                data.expression += item;
            } else {
                data.expression = data.expression.slice(
                    0,
                    data.expression.length - 1
                );
                data.expression += item;
            }
        }
        return this.setState({ calc: data });
    };

    deleteHandler = lastChar => {
        const data = { ...this.state.calc };
        if (data.output.length > 1 && !isNaN(parseInt(lastChar))) {
            data.output = data.output.slice(0, data.output.length - 1);
            data.expression = data.expression.slice(
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
        const data = { ...this.state.calc };
        if (isNaN(parseInt(str[str.length - 1]))) {
            str = str.slice(0, str.length - 1);
        }
        const expressionEval = math.eval(str);
        if (expressionEval === "Infinity" || expressionEval === "-Infinity") {
            return this.clearAllHandler();
        }
        data.output = math.format(expressionEval, { precision: 14 });
        data.expression = data.output;
        return this.setState({ calc: data });
    };

    plusMinusHandler(data, lastChar) {
        console.log(parseFloat(data.output));
        if (data.output === data.expression && parseFloat(data.output) > 0) {
            data.output = `-${data.output}`;
            data.expression = `-${data.expression}`;
        } else if (
            data.output === data.expression &&
            parseFloat(data.output) < 0
        ) {
            data.output = data.output.slice(1);
            data.expression = data.expression.slice(1);
        } else if (
            data.output !== data.expression &&
            !isNaN(parseInt(lastChar))
        ) {
            if (data.output.charAt(0) === "-")
                return this.expressionHandler(data.expression);
            let sliceIndex = data.expression.length - data.output.length;
            data.expression = `${data.expression.slice(0, sliceIndex)}-${
                data.output
            }`;
            data.output = `-${data.output}`;
        }
        this.setState({ calc: data });
    }

    render() {
        const controls = Object.entries(this.state).map(([key, val]) => {
            if (key !== "calc") {
                return (
                    <Controls
                        inputs={val}
                        clicked={this.inputHandler}
                        id={key}
                        key={key}
                        active={this.state.calc.decimalActive}
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
