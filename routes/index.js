import {
  developmentErrors,
  mongoseErrors,
  notFound,
  productionErrors
} from '../handlers/errorHandlers.js';
import additionalRoute from './additional.js';
import bookRoute from './book.js';
import borrowRoute from './borrow.js';
import categoryRoute from './category.js';
import optionRoute from './option.js';
import topicRoute from './topic.js';
import userRoute from './user.js';

function routes(app) {
  app.use('/user', userRoute);
  app.use('/option', optionRoute);
  app.use('/topic', topicRoute);
  app.use('/category', categoryRoute);
  app.use('/book', bookRoute);
  app.use('/borrow', borrowRoute);
  app.use('/additional', additionalRoute);

  // Setup Error Handlers
  app.use(notFound);
  app.use(mongoseErrors);
  if (process.env.ENV === 'DEVELOPMENT') {
    app.use(developmentErrors);
  } else {
    app.use(productionErrors);
  }
}

export default routes;
