import { User } from '../models/user.model';

export interface LoginWithProviderResponse {
  token: string;
  record: User;
  meta: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarUrl: string;
    accessToken: string;
    refreshToken: string;
    rawUser: unknown;
  };
}
