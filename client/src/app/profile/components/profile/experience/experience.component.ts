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
import {MediaMatcher} from "@angular/cdk/layout";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {Employment} from "../employment/employment.component";
import {User} from "../../../../shared/models/user-model";

@Component({
  selector: 'tech-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements OnInit {

  project = new FormControl('', [Validators.minLength(5)]);
  fromDate = new FormControl();
  toDate = new FormControl();
  description = new FormControl('', [Validators.minLength(30)]);

  experienceForm = new FormGroup({
    project: this.project,
    fromDate: this.fromDate,
    toDate: this.toDate,
    description: this.description
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
  editable = false;
  experiences: Experience[] = [];

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
    this.breakpoint = (event.target.innerWidth <= 414) ? 1 : 2;
  }

  showForm(experience?: Experience) {
    this.editable = true;
    // if the user click on edit option then populate the form with data
    if (experience) {
      this.project.setValue(experience.project);
      this.fromDate.setValue(experience.fromDate);
      this.toDate.setValue(experience.toDate);
      this.description.setValue(experience.description);
    } else {
      this.clear();
    }
  }

  hideForm() {
    this.editable = false;
  }

  addMore() {
    this.experiences.push({
        project: this.project.value,
        fromDate: this.fromDate.value,
        toDate: this.toDate.value,
        description: this.description.value
      });
    this.clear();
  }

  save() {
    this.action = 'save';

    if (this.project.value !== '') {
      this.addMore();
    }

    this.onProfileActionTriggered.emit({
      action: 'experience',
      experiences: this.experiences
    });

    // clear the experiences array
    this.experiences.length = 0;
  }

  clear() {
    this.project.setValue('');
    this.fromDate.setValue('');
    this.toDate.setValue('');
    this.description.setValue('');
  }

  enableActionButton(): boolean {
    return !this.project.valid || !this.description.valid || !this.project.dirty || !this.description.dirty;
  }

  showSuccessMessage(): string {
    if (this.loaded && this.action === 'save') {
      return 'Your experience has been saved.';
    }
  }

  getProjectTitleErrorMessage() {
    return this.project.hasError('minlength') ? 'Your project name must be at least 5 character long' : '';
  }

  getDescriptionErrorMessage() {
    return this.description.hasError('minlength') ? 'Your project description must be at least 30 character long' : '';
  }

}

export interface Experience {
  project: string,
  fromDate: Date,
  toDate: Date,
  description: string
}

