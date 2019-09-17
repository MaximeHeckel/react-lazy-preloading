const todos = (state = [], action) => {
  switch (action.type) {
    case "FETCH_TODOS_ACK":
      return { ...state, objects: [...action.payload] };
    case "FETCH_TODO_ACK":
      return { ...state, detail: { ...action.payload } };
    default:
      return state;
  }
};

export default todos;
