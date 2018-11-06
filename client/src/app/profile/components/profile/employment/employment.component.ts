import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectOption} from "../portfolio/portfolio.component";
import {MediaMatcher} from "@angular/cdk/layout";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {User} from "../../../../shared/models/user-model";

@Component({
  selector: 'tech-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmploymentComponent implements OnInit {

  company = new FormControl('', [Validators.minLength(3)]);
  designation = new FormControl();
  industry = new FormControl();
  role = new FormControl();
  fromDate = new FormControl();
  toDate = new FormControl();
  achievement = new FormControl();
  currentEmployer = new FormControl();

  employmentForm = new FormGroup({
    companyName: this.company,
    designation: this.designation,
    industry: this.industry,
    role: this.role,
    fromDate: this.fromDate,
    toDate: this.toDate,
    achievement: this.achievement,
    currentEmployer: this.currentEmployer
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


  designations: SelectOption[] = [
    {label: 'Software Engineer', value: 'Software Engineer'},
    {label: 'Sr. Software Engineer', value: 'Sr. Software Engineer'}
  ];

  industries: SelectOption[] = [
    {label: 'IT/Computer Software', value: 'IT/Computer Software'},
    {label: 'IT/Computer Hardware', value: 'IT/Computer Hardware'}
  ];

  roles: SelectOption[] = [
    {label: 'Software Programmer', value: 'Software Programmer'},
    {label: 'Software Support', value: 'Software Support'}
  ];

  action: string;
  editable = false;
  employments: Employment[] = [];

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

  showForm(employment?: Employment) {
    this.editable = true;
    // if the user click on edit option then populate the form with data
    if (employment) {
      this.company.setValue(employment.company);
      this.designation.setValue(employment.designation);
      this.industry.setValue(employment.industry);
      this.role.setValue(employment.role);
      this.fromDate.setValue(employment.fromDate);
      this.toDate.setValue(employment.toDate);
      this.achievement.setValue(employment.achievement);
    } else {
      this.clear();
    }
  }

  hideForm() {
    this.editable = false;
  }

  addMore() {
    this.employments.push({
      company: this.company.value,
      designation: this.designation.value,
      industry: this.industry.value,
      role: this.role.value,
      fromDate: this.fromDate.value,
      toDate: this.toDate.value,
      achievement: this.achievement.value,
      currentEmployer: this.currentEmployer.value || false
    });
    this.clear();
  }

  save() {
    this.action = 'save';

    if (this.company.value !== '') {
      this.addMore();
    }

    this.onProfileActionTriggered.emit({
      action: 'employment',
      employments: this.employments
    });

    // clear the employments array
    this.employments.length = 0;
  }

  clear() {
    this.company.setValue('');
    this.designation.setValue('');
    this.industry.setValue('');
    this.role.setValue('');
    this.fromDate.setValue('');
    this.toDate.setValue('');
    this.achievement.setValue('');
  }

  enableActionButton(): boolean {
    return !this.company.valid || !this.company.dirty;
  }

  showSuccessMessage(): string {
    if (this.loaded && this.action === 'save') {
      return 'Your employment details has been saved.';
    }
  }

  getCompanyNameErrorMessage() {
    return this.company.hasError('minlength') ? 'Your company name must be at least 3 character long' : '';
  }
 }

export interface SelectOption {
  label: string;
  value: string;
}

export interface Employment {
  company: string,
  designation: string,
  industry: string,
  role: string,
  fromDate: Date,
  toDate: Date,
  achievement: string,
  currentEmployer: boolean
}
