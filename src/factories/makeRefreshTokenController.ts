import { RefreshTokenController } from '../app/controllers/RefreshTokenController';

export function makeRefreshTokenController() {
  return new RefreshTokenController();
}
