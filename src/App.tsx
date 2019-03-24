import React, { Component } from "react";
import "./App.css";
import { FormWrapper } from "./FormWrapper";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main-header">Sugar Bliss Calculator</div>
        <FormWrapper />
      </div>
    );
  }
}

export default App;
