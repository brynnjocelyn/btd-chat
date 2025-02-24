import { Chat } from './chat.model';

export interface User {
  id: string;
  username: string;
  name: string;
  online: boolean;
  profileImage: string | Blob;
  images: (string | Blob)[];
  bio: string;
  created: string;
  updated: string;
  email: string;
  verified: boolean; // Email verification status
  emailVisibility: boolean;
  genderSpectrum: number;
  genderIdentity: GenderIdentity | string;
  sexualOrientation: string;
  pronouns: string;
  ethnicity: string[];
  headline: string;
  location: string; // Location ID
  notificationPreferences: string; // Notification Preferences ID
  expand?: Partial<{
    location: Partial<Location> | null; // Location of this user
    notificationPreferences: Partial<NotificationPreferences>; // Notification preferences for this user
    matches: Partial<Match>[]; // Users this user has matched with
    blockedUsers: Partial<User>[]; // Users this user has blocked
    likedUsers: Partial<Like>[]; // Users this user has liked
    likedByUsers: Partial<User>[]; // Users who have liked this user
    chats: Partial<Chat>[]; // Chats this user is a part of
  }>;
}

export enum GenderIdentity {
  CIS_MAN = 'Cisgender Man',
  CIS_WOMAN = 'Cisgender Woman',
  TRANS_MAN = 'Transgender Man',
  TRANS_WOMAN = 'Transgender Woman',
  TWO_SPIRIT = 'Tow Spirit',
  NON_BINARY = 'Non-Binary',
  GENDER_QUEER = 'Gender Queer',
  GENDER_FLUID = 'Gender Fluid',
  GENDER_NEUTRAL = 'Gender Neutral',
  ANDROGYNOUS = 'Androgynous',
  POLY_PAN_GENDER = 'Polygender/Pangender',
  OTHER = 'Other',
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  type: 'email' | 'push' | 'sms';
  emailChat: boolean;
  emailMatch: boolean;
  emailVisit: boolean;
  textEverything: boolean;
  textSameAsEmail: boolean;
  noText: boolean;
  created: string;
  updated: string;
}

export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  created: Date;
  expand?: {
    userId1: Partial<User>;
    userId2: Partial<User>;
  };
}

export interface Like {
  id: string;
  likerId: string;
  likedUserId: string;
  created: string;
  expand?: {
    likerId: Partial<User>;
    likedUserId: Partial<User>;
  };
}
