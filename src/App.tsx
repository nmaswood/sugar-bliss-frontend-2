import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Main } from "./Main";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />

        <div className="field">
          <div className="control">
            <input
              className="input is-info"
              type="text"
              placeholder="Info input"
            />
          </div>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello World <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
