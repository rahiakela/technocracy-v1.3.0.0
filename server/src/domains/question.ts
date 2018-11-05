import { User } from './user';

export interface Question {
    _id?: string;
  title?: string;
  content?: string;
  askedBy?: User;
  createdOn?: Date;
  submittedOn?: Date;
  publishedOn?: Date;
  updatedOn?: Date;
  status?: string;
  comments?: Comment[];
  likes?: string[];
  tags?: string[];
  voteUp?: string[];
  voteDown?: string[];
}
