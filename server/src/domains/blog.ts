import { Profile } from './profile';

export interface Blog {
  _id?: string;
  title?: string;
  content?: string;
  description?: string;
  profile?: Profile;
  createdOn?: Date;
  submittedOn?: Date;
  publishedOn?: Date;
  updatedOn?: Date;
  image?: string;
  status?: string;
  comments?: Comment[];
  likes?: string[];
  tags?: string[];
}
