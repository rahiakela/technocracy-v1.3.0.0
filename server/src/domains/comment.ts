import { User } from './user';

export interface Comment {
    _id?: string;
  content?: string;
  commentedBy?: User;
  commentedOn?: Date;
  likes?: string[];
  replies?: Reply[];
  notification?: string;
}

export interface Reply {
    _id?: string;
  content?: string;
  repliedBy?: User;
  repliedOn?: Date;
  likes?: string[];
}
