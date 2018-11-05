import {BlogService} from "./blog.service";
import {QuestionService} from "./question.service";
import {ProfileService} from "./profile.service";
import {UtilService} from "./util.service";
import {AuthService} from "./auth.service";
import {FileUploadService} from "./file-upload.service";
import {AuthenticationGuard} from "./authentication.guard";

export const SERVICES: any = [
  BlogService,
  QuestionService,
  ProfileService,
  UtilService,
  AuthService,
  FileUploadService,
  AuthenticationGuard
];
