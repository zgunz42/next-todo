import thunkMiddleware from './middleware/thunkMiddleware';
import loggerMiddleware from './middleware/loggerMiddleware';

const middleware = [
  thunkMiddleware
];

if (process.env.NODE_ENV === `development`) {

  middleware.push(loggerMiddleware);
}

// define store middlewares as an array
export default middleware;
