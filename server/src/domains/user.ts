import { Profile } from './profile';

export interface User {
    _id?: string;
  subscription?: string;
  role?: string;
  hash?: string;
  salt?: string;
  jwtToken?: string;
  local?: Local;
  facebook?: Facebook;
  google?: Google;
  twitter?: Twitter;
  linkedin?: LinkedIn;
  profile?: Profile;
}

interface Local {
  email?: string;
  name?: string;
  password?: string;
  salt?: string;
  hash?: string;
  image?: string;
  lastLogin?: Date;
  createdOn?: Date;
  active?: string;
  activatedOn?: Date;
  activateToken?: ActivateToken;
}

interface Facebook {
  email?: string;
  name?: string;
  uid?: string;
  image?: string;
  token?: string;
  provider?: string;
  lastLogin?: Date;
  createdOn?: Date;
}

interface Google {
  email?: string;
  name?: string;
  uid?: string;
  image?: string;
  token?: string;
  provider?: string;
  lastLogin?: Date;
  createdOn?: Date;
}

interface Twitter {
  email?: string;
  name?: string;
  uid?: string;
  image?: string;
  token?: string;
  provider?: string;
  lastLogin?: Date;
  createdOn?: Date;
}

interface LinkedIn {
  email?: string;
  name?: string;
  uid?: string;
  image?: string;
  token?: string;
  provider?: string;
  lastLogin?: Date;
  createdOn?: Date;
}

interface ActivateToken {
  token?: string;
  expires?: Date;
}
