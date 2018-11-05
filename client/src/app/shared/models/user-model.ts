/**
 * User Model
 * Author:Rahi Akela
 * Date  :03/03/2018
 * Description: This is the User models and also contains helper models
 * */
import {Profile} from "./profile-model";

export interface User {
   _id?: string,
  subscription?: string,
  role?: string,
  local?: Local,
  facebook?: Facebook,
  google?: Google,
  linkedin?: LinkedIn,
  jwtToken?: string,
  profile?: Profile
}

interface Local {
  email?: string,
  name?: string,
  password?: string,
  salt?: string,
  hash?: string,
  image?: string,
  lastLogin?: Date,
  createdOn?: Date,
  active?: string,
  activatedOn?: Date,
  activateToken?: ActivateToken
}

interface Facebook {
  email?: string,
  name?: string,
  uid?: string,
  image?: string,
  token?: string,
  provider?: string,
  lastLogin?: Date,
  createdOn?: Date
}

interface Google {
  email?: string,
  name?: string,
  uid?: string,
  image?: string,
  token?: string,
  provider?: string,
  lastLogin?: Date,
  createdOn?: Date
}

interface LinkedIn {
  email?: string,
  name?: string,
  uid?: string,
  image?: string,
  token?: string,
  provider?: string,
  lastLogin?: Date,
  createdOn?: Date
}

interface ActivateToken {
  token?: string,
  expires?: Date
}
