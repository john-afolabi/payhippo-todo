import express, { Request } from 'express';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { config } from '../config';
import { errorHandler } from './modules/common/utils';
import { rateLimit } from 'express-rate-limit';

const app = express();

const { SENTRY_DSN, NODE_ENV, SERVICE_PATH } = process.env;

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many request from this IP, please try again after 10 minutes',
});

// Middlewares
app.use(helmet());
app.use(compression());
const morganConfig = !config.isProduction ? 'dev' : 'tiny';
app.use(
  morgan(morganConfig, {
    skip: (req: Request) => !req.url.startsWith('/docs'),
  }),
);

app.use(
  cors({
    origin: (_origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  }),
);

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    environment: NODE_ENV,
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use((req: Request, _res, next) => {
    // @ts-ignore
    if (!req.transaction) {
      // @ts-ignore
      req.transaction = Sentry.startTransaction({
        op: 'test',
        name: 'My First Test Transaction',
      });
    }
    next();
  });
}

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.disable('x-powered-by');

app.use(`/${SERVICE_PATH}`, apiLimiter, routes);
app.use('/', apiLimiter, routes);

// Error handlers
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

if (!config.isTestEnvironment) {
  app.listen(config.port);
  console.info('App is listening on port:', config.port);
}

export { app };
