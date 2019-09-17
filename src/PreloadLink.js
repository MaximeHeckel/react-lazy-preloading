import React from "react";
import { Link, matchPath } from "react-router-dom";
import { routes } from "./";

const preloadRouteComponent = (to, onPreload) => {
  const component = findComponentForRoute(to, routes);

  if (component && component.preload) {
    component.preload();

    if (onPreload) {
      return Promise.all(onPreload.map(action => action()));
    }
  }
};

const findComponentForRoute = (path, routes) => {
  const matchingRoute = routes.find(route =>
    matchPath(path, {
      path: route.path,
      exact: route.exact
    })
  );

  if (matchingRoute && matchingRoute.routes) {
    return findComponentForRoute(path, matchingRoute.routes);
  }

  return matchingRoute ? matchingRoute.component : null;
};

const PreloadLink = ({ to, onPreload, ...rest }) => {
  return (
    <Link
      to={to}
      onMouseEnter={() => preloadRouteComponent(to, onPreload)}
      {...rest}
    />
  );
};

export default PreloadLink;
