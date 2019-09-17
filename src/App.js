import React from "react";
import { connect } from "react-redux";
import { fetchTodos } from "./actions";
import "./App.css";
import PreloadLink from "./PreloadLink";

const App = props => {
  return (
    <div className="App">
      <header className="App-header">
        <PreloadLink
          style={{ color: "white !important" }}
          to="/todos"
          onPreload={[() => props.dispatch(fetchTodos())]}
        >
          Todos
        </PreloadLink>
      </header>
    </div>
  );
};

export default connect()(App);
