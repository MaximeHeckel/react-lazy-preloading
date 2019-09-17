import { createPromise } from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const loggerMiddleware = createLogger({ level: "info", collapsed: true });

const getMiddleware = () => {
  const middlewares = [
    thunk.withExtraArgument(),
    createPromise({
      promiseTypeSuffixes: ["REQ", "ACK", "ERR"]
    }),
    loggerMiddleware
  ];

  return middlewares;
};

export default getMiddleware;
