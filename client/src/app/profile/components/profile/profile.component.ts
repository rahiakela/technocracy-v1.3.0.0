import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {UtilService} from '../../../core/services/util.service';
import {User} from '../../../shared/models/user-model';
import {FileUploadService} from '../../../core/services/file-upload.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'tech-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  @Input()
  user: User;
  @Input()
  loading: boolean;
  @Input()
  loaded: boolean;
  @Input()
  error: any;
  @Output()
  onProfileActionTriggered = new EventEmitter<any>();

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('profilePhoto') profilePhoto: ElementRef;

  uploadPercent: Observable<number>;
  imageURL: Observable<string>;

  constructor(public utilService: UtilService,
              private fileUploadService: FileUploadService,
              private storage: AngularFireStorage) { }

  ngOnInit() {

  }

  // handle profile actions such as save
  profileActionHandler(data: any) {
    this.onProfileActionTriggered.emit({data});
  }

  chooseFile(event) {
    event.preventDefault();
    this.fileUpload.nativeElement.click();
  }

  // ref: https://stackoverflow.com/questions/47936183/angular-5-file-upload
  uploadImage(files: FileList) {
    const fileToUpload: File = files.item(0);

    // check the file size, it should not be more than 150KB=1024*150=153600
    if (fileToUpload.size > 153600) {
      alert('Please make sure, the attached file should not be more than 150KB');
      return false;
    }

    const UPLOAD_PATH = `technocracy/images/profiles/${this.user._id}/${fileToUpload.name}`;
    // this.fileUploadService.uploadProfileImage(this.profilePhoto, fileToUpload, UPLOAD_PATH);

    const fileRef = this.storage.ref(`${UPLOAD_PATH}`);
    const uploadTask = this.storage.upload(UPLOAD_PATH, fileToUpload);

    // observe percentage changes
    this.uploadPercent = uploadTask.percentageChanges();
    // get notified when the image URL is available
    uploadTask.snapshotChanges()
      .pipe(
        finalize(() => {
          this.imageURL = fileRef.getDownloadURL();
          fileRef.getDownloadURL().subscribe(imageURL => {
            console.log(`Image URL: ${imageURL}`);
            // update user with profile image path
            this.profilePhoto.nativeElement.src = imageURL;
            // update current user with profile image
            const loggedUser = this.utilService.getCurrentUser();
            const updatedUser = this.utilService.getUserWithUpdatedImagePath(loggedUser, imageURL);
            // emit profile image update action for store-effect
            this.onProfileActionTriggered.emit({
              action: 'updateProfileImage',
              userId: updatedUser._id,
              user: updatedUser
            });
          });
        })
      )
      .subscribe();
  }

  getUserImage(): string {
    return this.utilService.getUserIcon(this.user);
  }

  getUserName() {
    if (this.user.profile) {
      return this.user.profile.name;
    } else {
      return this.utilService.getUserName(this.user);
    }
  }

}
