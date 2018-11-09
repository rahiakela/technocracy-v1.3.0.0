import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MediaMatcher} from "@angular/cdk/layout";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {User} from "../../../../shared/models/user-model";

@Component({
  selector: 'tech-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit, OnDestroy {

  skill = new FormControl();
  toDate = new FormControl();
  experience = new FormControl();
  experienceLevel = new FormControl();

  skillsForm = new FormGroup({
    skill: this.skill,
    toDate: this.toDate,
    experience: this.experience,
    experienceLevel: this.experienceLevel
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
  skills: Skill[] = [];

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
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
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

  showForm(option?: Skill) {
    this.editable = true;
    // if the user click on edit option then populate the form with data
    if (option) {
      this.skill.setValue(option.skill);
      this.toDate.setValue(option.toDate);
      this.experience.setValue(option.experience);
      this.experienceLevel.setValue(option.experienceLevel);
    } else {
      this.clear();
    }
  }

  hideForm() {
    this.editable = false;
  }

  addMore() {
    this.skills.push({
      skill: this.skill.value,
      toDate: this.toDate.value,
      experience: this.experience.value,
      experienceLevel: this.experienceLevel.value
    });
    this.clear();
  }

  save() {
    this.action = 'save';

    if (this.skill.value !== '') {
      this.addMore();
    }

    this.onProfileActionTriggered.emit({
      action: 'skills',
      skills: this.skills
    });

    // clear the skills array
    this.skills.length = 0;
  }

  clear() {
    this.skill.setValue('');
    this.toDate.setValue('');
    this.experience.setValue('');
    this.experienceLevel.setValue('');
  }

  enableActionButton(): boolean {
    return !this.skill.dirty || !this.experience.dirty;
  }

  showSuccessMessage(): string {
    if (this.loaded && this.action === 'save') {
      return 'Your skills has been saved.';
    }
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
    this.subscriptionMedia.unsubscribe();
  }

  skilles: SelectOption[] = [
    {label: 'IT/Computer Software', value: 'IT/Computer Software'},
    {label: 'IT/Computer Hardware', value: 'IT/Computer Hardware'}
  ];

  experiences: SelectOption[] = [
    {label: 'Software Programmer', value: 'Software Programmer'},
    {label: 'Software Support', value: 'Software Support'},
    {label: 'Sr. Software Engineer', value: 'Sr. Software Engineer'}
  ];

  experienceLevels: SelectOption[] = [
    {label: 'Software Engineer', value: 'Software Engineer'},
    {label: 'Software Support', value: 'Software Support'},
    {label: 'Sr. Software Engineer', value: 'Sr. Software Engineer'}
  ];
}
export interface SelectOption {
  label: string;
  value: string;
}
export interface Skill {
  skill: string,
  toDate: Date,
  experience: string,
  experienceLevel: string
}
