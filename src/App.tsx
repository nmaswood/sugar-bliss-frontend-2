import React, { Component } from "react";
import "./App.css";
import { FormWrapper } from "./FormWrapper";
import { Header } from "./Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FormWrapper />
      </div>
    );
  }
}

export default App;
