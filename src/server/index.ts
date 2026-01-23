import express from 'express';
import { makeAuthenticationMiddlewares } from '../factories/makeAuthenticationMiddlewares';
import { makeAuthorizationMiddlewares } from '../factories/makeAuthorizationMiddleware';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { makeRefreshTokenController } from '../factories/makeRefreshTokenController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';
import { midlewareAdapter } from './adapters/midlewareAdapter';
import { routeAdapter } from './adapters/routeAdapter';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.post(
  '/refresh-token',
  routeAdapter(makeRefreshTokenController()),
);

app.get(
  '/leads',
  midlewareAdapter(makeAuthenticationMiddlewares()),
  midlewareAdapter(
    makeAuthorizationMiddlewares(['leads:read']),
  ),
  routeAdapter(makeListLeadsController()),
);

app.post(
  '/leads',
  midlewareAdapter(makeAuthenticationMiddlewares()),
  midlewareAdapter(
    makeAuthorizationMiddlewares(['leads:write']),
  ),
  (request, response) => {
    response.status(201).json({ message: 'lead created' });
  },
);

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
});
