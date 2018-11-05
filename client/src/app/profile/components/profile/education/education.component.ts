import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MediaMatcher} from "@angular/cdk/layout";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {User} from "../../../../shared/models/user-model";

@Component({
  selector: 'tech-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnInit {

  qualification = new FormControl();
  passingDate = new FormControl();
  university = new FormControl();
  specialization = new FormControl();
  certification = new FormControl();
  issuedBy = new FormControl();
  issuedDate = new FormControl();
  lifetimeValidity = new FormControl();

  degreeForm = new FormGroup({
    qualification: this.qualification,
    passingDate: this.passingDate,
    university: this.university,
    specialization: this.specialization
  });

  certificationForm = new FormGroup({
    certification: this.certification,
    issuedBy: this.issuedBy,
    issuedDate: this.issuedDate,
    lifetimeValidity: this.lifetimeValidity
  });

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

  action: string;
  editDegree = false;
  editCertificate = false;

  degrees: Degree[] = [];
  certifications: Certification[] = [];
  qualifications: SelectOption[] = [
    {label: 'IT/Computer Software', value: 'IT/Computer Software'},
    {label: 'IT/Computer Hardware', value: 'IT/Computer Hardware'}
  ];

  universities: SelectOption[] = [
    {label: 'IGNOU', value: 'IGNOOU'},
    {label: 'Amity', value: 'Amity'},
  ];

  specializations: SelectOption[] = [
    {label: 'IT/Computer Software', value: 'IT/Computer Software'},
    {label: 'IT/Computer Hardware', value: 'IT/Computer Hardware'}
  ];

  // grid responsive settings
  breakpoint: number;
  mobileQuery: MediaQueryList;
  isMobileView = false;
  subscriptionMedia : Subscription;
  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public mobileMedia: ObservableMedia) {
    // mobile device detection
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isMobileView = (this.mobileMedia.isActive('xs') || this.mobileMedia.isActive('sm'));
    this.subscriptionMedia = this.mobileMedia.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
        this.breakpoint = this.isMobileView ? 1 : 2;
      }
    });
    this.breakpoint = this.isMobileView ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  showDegreeForm(degree?: Degree) {
    this.editDegree = true;
    // if the user click on edit option then populate the form with data
    if (degree) {
      this.qualification.setValue(degree.qualification);
      this.passingDate.setValue(degree.passingDate);
      this.university.setValue(degree.university);
      this.specialization.setValue(degree.specialization);
    } else {
      this.clearDegree();
    }
  }

  showCertificateForm(certification?: Certification) {
    this.editCertificate = true;
    // if the user click on edit option then populate the form with data
    if (certification) {
      this.certification.setValue(certification.certification);
      this.issuedBy.setValue(certification.issuedBy);
      this.issuedDate.setValue(certification.issuedDate);
      this.lifetimeValidity.setValue(certification.lifetimeValidity);
    } else {
      this.clearCertificate();
    }
  }

  hideDegreeForm() {
    this.editDegree = false;
  }
  hideCertificationForm() {
    this.editCertificate = false;
  }

  addMoreDegree() {
    this.degrees.push({
      qualification: this.qualification.value,
      passingDate: this.passingDate.value,
      university: this.university.value,
      specialization: this.specialization.value
    });
    this.clearDegree();
  }

  addMoreCertification() {
    this.certifications.push({
      certification: this.certification.value,
      issuedBy: this.issuedBy.value,
      issuedDate: this.issuedDate.value,
      lifetimeValidity: this.lifetimeValidity.value
    });
    this.clearCertificate();
  }

  save() {
      this.action = 'save';

      if (this.qualification.value !== '') {
        this.addMoreDegree();
      }
      if (this.certification.value !== '') {
        this.addMoreCertification();
      }

      this.onProfileActionTriggered.emit({
        action: 'education',
        degrees: this.degrees,
        certifications: this.certifications
      });

    // clear the degrees and certifications array
    this.degrees.length = 0;
    this.certifications.length = 0;
  }

  clearDegree() {
    this.qualification.setValue('');
    this.passingDate.setValue('');
    this.university.setValue('');
    this.specialization.setValue('');
  }

  clearCertificate() {
    this.certification.setValue('');
    this.issuedBy.setValue('');
    this.issuedDate.setValue('');
    this.lifetimeValidity.setValue('');
  }

  enableFirstAddMore(): boolean {
    return !this.qualification.valid || !this.qualification.dirty;
  }

  enableSecondAddMore(): boolean {
    return !this.certification.valid || !this.certification.dirty;
  }

  showSuccessMessage(): string {
    if (this.loaded && this.action === 'save') {
      return 'Your education has been saved.';
    }
  }

}
export interface SelectOption {
  label: string;
  value: string;
}
export interface Degree {
  qualification: string,
  passingDate: Date,
  university: string,
  specialization: string,
}

export interface Certification {
  certification: string,
  issuedBy: string,
  issuedDate: Date,
  lifetimeValidity: string,
}
