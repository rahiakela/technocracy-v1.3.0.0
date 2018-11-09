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
import {UtilService} from "../../../core/services/util.service";
import {User} from "../../../shared/models/user-model";
import {FileUploadService} from "../../../core/services/file-upload.service";
import {JsonLoadService} from "../../../core/services/json-load.service";
import {map, startWith} from "rxjs/operators";
import {Company} from "./employment/employment.component";

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

  constructor(public utilService: UtilService,
              private fileUploadService: FileUploadService) { }

  ngOnInit() {

  }

  // handle profile actions such as save
  profileActionHandler(data : any) {
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

    const UPLOAD_PATH = `images/profiles/${this.user._id}`;
    this.fileUploadService.upload(this.profilePhoto, fileToUpload, UPLOAD_PATH);
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
