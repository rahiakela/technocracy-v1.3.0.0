import {User} from './user-model';

/**
 * Profile Model
 * Author: Rahi Akela
 * Created Date  : 03/03/2018
 * Updated On : 26/10/2018
 * Updated On : 04/11/2018
 * Description: This is the main Profile models.
 * */

export interface Profile {
  _id?: string,
  name?: string,
  description?: string,
  address?: string,
  city?: string,
  country?: string,
  portfolio?: Portfolio,
  employments?: Employment[],
  experiences?: Experience[],
  skills?: Skill[],
  degrees?: Degree[],
  certifications?: Certification[],
  user?: User
}

interface Portfolio {
  dob: Date,
  gender: string,
  phone: number,
  email: string,
  mobile: number,
  socialLink: SocialLink
}
interface SocialLink {
  facebook?: string,
  twitter?: string,
  google?: string,
  linkedin?: string
}
export interface Employment {
  company: string,
  designation: string,
  industry: string,
  roles: string,
  fromDate: Date,
  toDate: Date,
  achievements: string,
  currentEmployer: boolean
}
interface Experience {
  project: string,
  fromDate: Date,
  toDate: Date,
  description: string
}
export interface Skill {
  skill: string,
  experience: number,
  lastUsed: number,
  experienceLevel: string
}
export interface Degree {
  qualification: string,
  passingYear: number,
  instituteUniversity: string,
  specialization: string
}
export interface Certification {
  name: string,
  issuedBy: string,
  issuedDate: Date,
  lifetimeValidity: boolean
}
