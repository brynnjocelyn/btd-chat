export interface AuthWithPasswordResponse {
  token: string;
  record: AuthenticatedUserRecord;
}

export interface AuthenticatedUserRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string;
  updated: string;
  name: string;
  profileImage: string;
  images: string[];
  bio: string;
  matches: string[];
  genderIdentity: GenderIdentity;
  genderSpectrum: number;
  headline: string;
  ethnicity: string[];
  location: string;
  notificationPreferences: string;
  pronouns: Pronouns;
  online: boolean;
}

export enum Pronouns {
  SHE_HER_HERS = 'SHE/HER/HERS',
  HE_HIM_HIS = 'HE/HIM/HIS',
  THEY_THEM_THEIRS = 'THEY/THEM/THEIRS',
  ZE_HIR_HIRS = 'ZE/HIR/HIRS',
  OTHER = 'OTHER',
}

export enum GenderIdentity {
  CIS_MAN = 'CIS_MAN',
  CIS_WOMAN = 'CIS_WOMAN',
  TRANS_MAN = 'TRANS_MAN',
  TRANS_WOMAN = 'TRANS_WOMAN',
  TWO_SPIRIT = 'TWO_SPIRIT',
  NON_BINARY = 'NON_BINARY',
  GENDER_QUEER = 'GENDER_QUEER',
  GENDER_FLUID = 'GENDER_FLUID',
  GENDER_NEUTRAL = 'GENDER_NEUTRAL',
  POLY_PAN_GENDER = 'POLY_PAN_GENDER',
  ANDROGYNOUS = 'ANDROGYNOUS',
}
