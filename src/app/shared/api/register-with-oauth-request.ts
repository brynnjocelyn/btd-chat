export interface RegisterWithOAuthRequest {
  provider: string;
  code: string;
  codeVerifier: string;
  redirectUri?: string;
  redirectUrl?: string;
  createData?: CreateUserData;
}

export interface CreateUserData {
  id?: string; //15 characters string to store as record ID. If not set, it will be auto generated.

  // Auth fields
  username?: string; //The username of the auth record. If not set, it will be auto generated.
  email?: string; //Auth record email address.
  emailVisibility?: boolean; //Whether to show/hide the auth record email when fetching the record data.
  password: string; //Auth record password.
  passwordConfirm: string; //Auth record password confirmation.
  verified?: boolean; //Indicates whether the auth record is verified or not. This field can be set only by admins or auth records with "Manage" access.

  //Schema fields
  name?: string; //Plain text value.
  profileImage?: File; //File object. Set to null to delete already uploaded file(s).Set to null to delete already uploaded file(s).
  images?: File[]; //Array of File objects. Set to null to delete already uploaded file(s).Set to null to delete already uploaded file(s).
  bio?: string; //Plain text value.
  matches?: string[]; //Relation record ids.
  genderIdentity?: string; //Enum value.
  genderSpectrum?: number; //Number value.
  headline?: string; //Plain text value.
  ethnicity?: string[]; //Array of plain text values.
  location?: string; //Relation record id.
  notificationPreferences?: string; //Relation record id.
  pronouns?: string; //Enum value.
  online?: boolean; //Boolean value.
}
