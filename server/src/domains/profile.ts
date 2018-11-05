import { User } from './user';

export interface Profile {
    _id?: string;
  name?: string;
  designation?: string;
  description?: string;
  company?: string;
  joinedOn?: Date;
  phone?: number;
  address?: string;
  city?: string;
  country?: string;
  photo?: string;
  skills?: string[];
  socialLink?: SocialLink;
  user?: User;
}

interface SocialLink {
  facebook?: string;
  twitter?: string;
  google?: string;
  linkedin?: string;
}
