import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import middlewares from "./middleware";
import "./index.css";

const configureStore = rootRed => {
  const store = createStore(
    rootRed,
    composeWithDevTools(applyMiddleware(...middlewares()))
  );

  return store;
};

const history = createHistory();
const store = configureStore(rootReducer);

const ReactLazyPreload = importStatement => {
  const Component = React.lazy(importStatement);
  Component.preload = importStatement;
  return Component;
};

const App = ReactLazyPreload(() =>
  import(/* webpackChunkName: 'App' */ "./App")
);

const Todos = ReactLazyPreload(() =>
  import(/* webpackChunkName: 'Todos' */ "./Todos")
);

const Todo = ReactLazyPreload(() =>
  import(/* webpackChunkName: 'TodoDetail' */ "./Todo")
);

export const routes = [
  { path: "/", exact: true, component: App },
  { path: "/todos", exact: true, component: Todos },
  { path: "/todos/:id", exact: true, component: Todo }
];

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <React.Suspense fallback={"Loading"}>
        <Switch key="router">
          {routes.map(route => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </React.Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);
