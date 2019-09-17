import React from "react";
import { connect } from "react-redux";
import { fetchTodo } from "./actions";
import "./App.css";

const App = props => {
  const { dispatch, match, todo } = props;

  React.useEffect(() => {
    dispatch(fetchTodo(match.params.id));

    return () => null;
  }, [dispatch, match.params.id]);

  return (
    <div className="App">
      <header className="App-header">
        {todo ? (
          <div style={{ color: "black" }} id={todo.id}>
            {todo.title}
          </div>
        ) : null}
      </header>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    todos: { detail }
  } = state;
  return {
    todo: detail
  };
};

export default connect(mapStateToProps)(App);
