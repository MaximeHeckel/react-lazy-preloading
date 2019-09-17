import React from "react";
import { connect } from "react-redux";
import { fetchTodos, fetchTodo } from "./actions";
import "./App.css";
import PreloadLink from "./PreloadLink";

const App = props => {
  const { dispatch } = props;

  React.useEffect(() => {
    if (!props.todos || props.todos.length === 0) {
      dispatch(fetchTodos());
    }

    return () => null;
  }, [dispatch, props.todos]);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {props.todos &&
            props.todos.map(todo => (
              <li>
                <PreloadLink
                  to={`/todos/${todo.id}`}
                  onPreload={[() => dispatch(fetchTodo(todo.id))]}
                >
                  {todo.title}
                </PreloadLink>
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    todos: { objects }
  } = state;
  return {
    todos: objects
  };
};

export default connect(mapStateToProps)(App);
