import { User } from './user';

export class Auth {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
