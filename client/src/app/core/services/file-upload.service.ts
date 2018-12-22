import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as AWS from 'aws-sdk';
import {UtilService} from './util.service';
import { Store} from '@ngrx/store';
import { RootStoreState} from '../../root-store';
import { AuthActions } from '../../root-store/auth-store';

/* references
* 1-https://docs.aws.amazon.com/AmazonS3/latest/user-guide/set-permissions.html
* 2-https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
* 3-https://docs.aws.amazon.com/AmazonS3/latest/user-guide/add-cors-configuration.html
* ####################CORS configuration##########################
* <CORSRule>
*    <AllowedOrigin>*</AllowedOrigin>
*    <AllowedMethod>PUT</AllowedMethod>
*    <AllowedMethod>POST</AllowedMethod>
*    <AllowedMethod>DELETE</AllowedMethod>
*    <AllowedHeader>*</AllowedHeader>
*</CORSRule>
*<CORSRule>
*    <AllowedOrigin>*</AllowedOrigin>
*    <AllowedMethod>GET</AllowedMethod>
*</CORSRule>
* */
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  bucket: any;

  constructor(private store$: Store<RootStoreState.State>, private utilService: UtilService) {
    this.bucket = new AWS.S3({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: 'us-east-1'
    });
  }

  upload(editor: any, file: any, uploadPath: string) {

    const params = {
      Bucket: environment.Bucket,
      Key: `${uploadPath}/${file.name}`,
      Body: file,
      ACL: 'public-read'
    };

    this.bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
      }

      // push image url to rich editor.
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'image', data.Location);
    });
  }

  uploadProfileImage(element: any, file: any, uploadPath: string) {

    const params = {
      Bucket: environment.Bucket,
      Key: `${uploadPath}/${file.name}`,
      Body: file,
      ACL: 'public-read'
    };

    this.bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
      }

      /**
       * Step3. insert image into editor or profile image frame
       */
      // update user with profile image path
      element.nativeElement.src = data.Location;
      const loggedUser = this.utilService.getCurrentUser();
      const updatedUser = this.utilService.getUserWithUpdatedImagePath(loggedUser, data.Location);
      this.store$.dispatch(new AuthActions.UpdateProfilePhoto({userId: updatedUser._id, user: updatedUser}));
    });
  }
}
