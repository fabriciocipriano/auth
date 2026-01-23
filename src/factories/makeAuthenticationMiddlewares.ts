import { AuthenticationMiddlewares } from '../app/middlewares/AuthenticationMiddlewares';

export function makeAuthenticationMiddlewares() {
  return new AuthenticationMiddlewares();
}
