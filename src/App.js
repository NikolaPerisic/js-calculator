import React, { Component } from "react";
import "./App.scss";
import Calculator from "./Containers/Calculator";

class App extends Component {
    render() {
        return (
            <div className="Wrapper">
                <Calculator />
            </div>
        );
    }
}

export default App;
