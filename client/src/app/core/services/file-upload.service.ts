import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as AWS from 'aws-sdk';
import {UtilService} from "./util.service";
import { Store} from "@ngrx/store";
import { RootStoreState} from "../../root-store";
import { AuthActions } from '../../root-store/auth-store';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private store$: Store<RootStoreState.State>, private utilService: UtilService) { }

  upload(editor: any, file: any, uploadPath: string) {

    const bucket = new AWS.S3({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: 'us-east-1'
    });

    const params = {
      Bucket: environment.Bucket,
      Key: `${uploadPath}/${file.name}`,
      Body: file,
      ACL: 'public-read'
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
      }

      /**
       * Step3. insert image into editor or profile image frame
       */
      if (editor.nativeElement.className === 'profile-pic') {
        // update user with profile image path
        editor.nativeElement.src = data.Location;
        const loggedUser = this.utilService.getCurrentUser();
        const updatedUser = this.utilService.getUserWithUpdatedImagePath(loggedUser, data.Location);
        this.store$.dispatch(new AuthActions.UpdateProfilePhoto({userId: updatedUser._id, user: updatedUser}));
      } else {
        // push image url to rich editor.
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', data.Location);
      }
    });
  }
}
