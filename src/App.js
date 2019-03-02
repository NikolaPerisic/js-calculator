import React, { Component } from "react";
import "./App.scss";
import Calculator from "./Containers/Calculator";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Calculator />
            </React.Fragment>
        );
    }
}

export default App;
