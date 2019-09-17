export const fetchTodos = () => dispatch =>
  dispatch({
    type: "FETCH_TODOS",
    payload: {
      promise: fetch("https://jsonplaceholder.typicode.com/todos").then(
        response => response.json()
      )
    }
  });

export const fetchTodo = id => dispatch =>
  dispatch({
    type: "FETCH_TODO",
    payload: {
      promise: fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
        response => response.json()
      )
    }
  });
