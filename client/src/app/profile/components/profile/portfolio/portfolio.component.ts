import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MediaMatcher} from "@angular/cdk/layout";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Observable, Subscription} from "rxjs";
import {User} from "../../../../shared/models/user-model";
import {JsonLoadService} from "../../../../core/services/json-load.service";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'tech-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit, OnDestroy {

  name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  dob = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.minLength(10)]);
  email = new FormControl('', [Validators.email]);
  mobile = new FormControl('', [Validators.minLength(10)]);
  description = new FormControl();
  facebook = new FormControl();
  google = new FormControl();
  twitter = new FormControl();
  linkedIn = new FormControl();
  address = new FormControl();
  country = new FormControl();
  city = new FormControl();

  portfolioForm = new FormGroup({
    name: this.name,
    dob: this.dob,
    gender: this.gender,
    phone: this.phone,
    email: this.email,
    mobile: this.mobile,
    description: this.description,
    facebook: this.facebook,
    google: this.google,
    twitter: this.twitter,
    linkedIn: this.linkedIn,
    address: this.address,
    country: this.country,
    city: this.city
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

  genders: SelectOption[] = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  /*countries: SelectOption[] = [
    {label: 'India', value: 'india'},
    {label: 'US', value: 'us'}
  ];*/

  editable = false;
  action: string;

  countries: Country[] = [];
  filteredCountries: Observable<Country[]>;

  cities: City[] = [];
  filteredCities: Observable<City[]>;

  // grid responsive settings
  breakpoint: number;
  colSpan: number;
  mobileQuery: MediaQueryList;
  isMobileView = false;
  subscriptionMedia : Subscription;
  private _mobileQueryListener: () => void;

  constructor(private jsonService: JsonLoadService,
              private changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public mobileMedia: ObservableMedia) {
    // mobile device detection
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    // ref: https://github.com/angular/material2/issues/1130
    // https://github.com/angular/flex-layout/wiki/ObservableMedia
    // Subscribe to the "MediaChange" to responsively change the boolean that will control the state of the sidenav
    this.isMobileView = (this.mobileMedia.isActive('xs') || this.mobileMedia.isActive('sm'));
    this.subscriptionMedia = this.mobileMedia.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
        this.breakpoint = this.isMobileView ? 1 : 2;
      }
    });
    this.breakpoint = this.isMobileView ? 1 : 2;

    // populate form with values
    this.populateFormValues();

    // load countries data from json file
    this.jsonService.loadCountries()
      .subscribe(countries => {
        this.countries = countries;
      });

    // filter countries
    this.filteredCountries = this.country.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? this._filterCountries(country) : this.countries.slice(0, 5))
      );

    // load cities data from json file
    this.jsonService.loadCities()
      .subscribe(cities => {
        this.cities = cities;
      });

    // filter cities
    this.filteredCities = this.city.valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this._filterCities(city) : this.cities.slice(0, 5))
      );
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  showForm() {
    this.editable = true;
  }
  hideForm() {
    this.editable = false;
  }

  save() {
    this.action = 'save';
    this.onProfileActionTriggered.emit({
      action: 'portfolio',
      portfolio: {
        name: this.name.value,
        description: this.description.value,
        address: this.address.value,
        country: this.country.value,
        city: this.city.value,
        portfolio: {
          dob: this.dob.value,
          gender: this.gender.value,
          phone: this.phone.value,
          email: this.email.value,
          mobile: this.mobile.value,
          socialLink: {
            facebook: this.facebook.value,
            google: this.google.value,
            twitter: this.twitter.value,
            linkedIn: this.linkedIn.value
          }
        }
      }
    });
  }

  populateFormValues() {
    if (this.user.profile) {
      this.name.setValue(this.user.profile.name);
      this.description.setValue(this.user.profile.description);
      this.address.setValue(this.user.profile.address);
      this.country.setValue(this.user.profile.country);
      this.city.setValue(this.user.profile.city);
      this.dob.setValue(this.user.profile.portfolio ? this.user.profile.portfolio.dob : '');
      this.gender.setValue(this.user.profile.portfolio ? this.user.profile.portfolio.gender : '');
      this.phone.setValue(this.user.profile.portfolio ? this.user.profile.portfolio.phone : '');
      this.email.setValue(this.user.profile.portfolio ? this.user.profile.portfolio.email : '');
      this.mobile.setValue(this.user.profile.portfolio ? this.user.profile.portfolio.mobile : '');
      this.facebook.setValue(this.user.profile.portfolio && this.user.profile.portfolio.socialLink ? this.user.profile.portfolio.socialLink.facebook : '');
      this.google.setValue(this.user.profile.portfolio && this.user.profile.portfolio.socialLink ? this.user.profile.portfolio.socialLink.twitter : '');
      this.twitter.setValue(this.user.profile.portfolio && this.user.profile.portfolio.socialLink ? this.user.profile.portfolio.socialLink.google : '');
      this.linkedIn.setValue(this.user.profile.portfolio && this.user.profile.portfolio.socialLink ? this.user.profile.portfolio.socialLink.linkedin : '');
    }
  }

  clear() {
    this.name.setValue('');
    this.dob.setValue('');
    this.gender.setValue('');
    this.phone.setValue('');
    this.email.setValue('');
    this.mobile.setValue('');
    this.description.setValue('');
    this.facebook.setValue('');
    this.google.setValue('');
    this.twitter.setValue('');
    this.linkedIn.setValue('');
    this.address.setValue('');
    this.country.setValue('');
    this.city.setValue('');
  }

  enableActionButton(): boolean {
    return !this.name.valid || !this.dob.valid || !this.gender.valid || !this.phone.valid || !this.email.valid;
  }

  showSuccessMessage(): string {
    if (this.loaded && this.action === 'save') {
      return 'Your portfolio has been saved.';
    }
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Please name yourself' :
      this.name.hasError('minlength') ? 'You name must be at least 4 character long' : '';
  }

  getDOBErrorMessage() {
    return this.dob.hasError('required') ? 'Please select your date of birth' : '';
  }

  getGenderErrorMessage() {
    return this.gender.hasError('required') ? 'Please select your gender' : '';
  }

  getPhoneErrorMessage() {
    return this.phone.hasError('number') ? 'Phone number must be digit only.' : this.phone.hasError('minlength') ? 'Phone number length must be at least 10 digit long' : '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('email') ? 'Email id must contain @ character' : '';
  }

  private _filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(country => country.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(city => city.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
    this.subscriptionMedia.unsubscribe();
  }
}

export interface SelectOption {
  label: string;
  value: string;
}
export interface Country {
  name: string;
  url: string;
}
export interface City {
  name: string;
}
