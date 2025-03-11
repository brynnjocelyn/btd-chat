import { GenderIdentity, Pronouns } from './auth-with-password-response';

export interface RegisterWithPasswordResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  username?: string;
  verified?: boolean;
  emailVisibility?: boolean;
  email: string;
  created: string;
  updated: string;
  name?: string;
  profileImage?: string;
  images?: string[];
  bio?: string;
  matches?: string[];
  genderIdentity?: GenderIdentity;
  genderSpectrum?: number;
  headline?: string;
  ethnicity?: string[];
  location?: string;
  notificationPreferences?: string;
  pronouns?: Pronouns;
  online?: boolean;
}
