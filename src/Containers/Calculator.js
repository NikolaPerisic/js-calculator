import React, { Component } from "react";
import "../App.scss";
import Controls from "../Components/Controls";
import Display from "../Components/Display";
import Data from "../assets/Data/Data";
import math from "mathjs";

class Calculator extends Component {
    state = { ...Data };

    // manage all inputs
    inputHandler = el => {
        const item = el.currentTarget.value;
        const data = { ...this.state.calc };
        const lastChar = data.expression.charAt(data.expression.length - 1);

        //check if inputs match any main expression operators
        if (item === "DEL") return this.deleteHandler(lastChar);
        if (item === "C") return this.clearAllHandler();
        if (item === "=") return this.expressionHandler(data.expression);
        if (item === "±") return this.plusMinusHandler(data, lastChar);
        if (data.grandTotal) return this.newCalcHandler(item, data);

        // check if input is a decimal operator and if output already contains decimal, preventing double decimal input
        if (
            (item === "." &&
                data.output.indexOf(".") !== -1 &&
                !isNaN(parseInt(lastChar))) ||
            (item === "0" && data.output === "0") ||
            (item === "." && lastChar === ".")
        )
            return null;

        // inserting zero in front of decimal, if user directly clicked on decimal operator
        if (item === "." && isNaN(parseInt(lastChar))) {
            data.output = "0.";
            data.expression += "0.";
            return this.setState({ calc: data });
        }
        // setting new input if calculation starts from 0
        if (data.expression === "0") {
            if (!isNaN(parseInt(item))) {
                data.expression = item;
                data.output = item;
                // adding decimal to zero
            } else if (item === ".") {
                data.expression += item;
                data.output += item;
            } else {
                data.expression += item;
            }
            // adding decimal operator if display isn't zero
        } else if (item === ".") {
            data.expression += item;
            data.output += item;

            // managing other inputs in case calc is already in process
        } else {
            // check what input user clicked, and update display such that no false input is parsed.
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
    // deleting value if user clicked on DEL btn, removing it from display
    deleteHandler = lastChar => {
        const data = { ...this.state.calc };
        // check if expression string isn't already zeroed
        if (data.output.length > 1 && !isNaN(parseInt(lastChar))) {
            data.output = data.output.slice(0, data.output.length - 1);
            data.expression = data.expression.slice(
                0,
                data.expression.length - 1
            );
            // in case of reaching up to a single digit output, reseting state to initial value with clearAll func
        } else if (
            (data.output.length > 1 && isNaN(parseInt(lastChar))) ||
            data.output.length === 1
        ) {
            return this.clearAllHandler();
        }
        return this.setState({ calc: data });
    };

    // reset state to initial values
    clearAllHandler = () => {
        return this.setState({ calc: Data.calc });
    };

    // managing final expression if user clicked '='
    expressionHandler = str => {
        const data = { ...this.state.calc };
        /*check if there are any trailing mathematical operators at the end of the expression string, and removing it, 
        effectively making string evaluable with math function */
        if (isNaN(parseInt(str[str.length - 1]))) {
            str = str.slice(0, str.length - 1);
        }
        //eval expression and dealing with Infinity cases, replacing it with zero on user display
        const expressionEval = math.eval(str);
        if (
            expressionEval.toString() === "Infinity" ||
            expressionEval.toString() === "-Infinity"
        ) {
            return this.clearAllHandler();
        }
        // formatting expression and dealing with floating point error
        data.expression = math.format(expressionEval, { precision: 14 });
        data.output = data.expression;
        data.grandTotal = true;
        return this.setState({ calc: data });
    };

    // dealing with +/- changing sign operator
    plusMinusHandler(data, lastChar) {
        // preventing sign operator to be enabled on mod expression
        if (data.expression.indexOf("%") !== -1) return null;
        // adding negative sign in front of positive num
        if (data.output === data.expression && parseFloat(data.output) > 0) {
            data.output = `-${data.output}`;
            data.expression = `-${data.expression}`;
            // removing negative sign in case expression is positive
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
            // returning evaluation function in case user double clicked change sign operator
            if (data.output.charAt(0) === "-")
                return this.expressionHandler(data.expression);
            // changing sign of the last digit in the expression
            let sliceIndex = data.expression.length - data.output.length;
            data.expression = `${data.expression.slice(0, sliceIndex)}-${
                data.output
            }`;
            data.output = `-${data.output}`;
        }
        this.setState({ calc: data });
    }

    /* this func deals with user input in case at least one calculation is already performed. If user wants to continue 
    with the lastAnswer, clicking one of the math operators will do so, in case new digit is clicked, calculation starts 
    from the beginning */
    newCalcHandler = (item, data) => {
        console.log(item);
        if (!isNaN(parseInt(item))) {
            this.clearAllHandler();
            data.output = item;
            data.expression = item;
            data.grandTotal = false;
        } else {
            data.output += item;
            data.expression += item;
            data.grandTotal = false;
        }
        return this.setState({ calc: data });
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
