import React, { Component } from "react";
import "./App.scss";
import Calculator from "./Containers/Calculator";
import Footer from "./Components/Footer";
class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Calculator />
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
