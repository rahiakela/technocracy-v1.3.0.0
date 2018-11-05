import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import {SharedModule} from '../shared/shared.module';
import {QuestionMaterialModule} from "./question-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecaptchaFormsModule} from "ng-recaptcha/forms";
import {RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {COMPONENTS} from "./components";
import {CONTAINERS} from "./containers";
import {RESOLVERS} from "./resolver";

// ref: https://www.npmjs.com/package/ng-recaptcha
const GLOBAL_RECAPTCHA_SETTINGS: RecaptchaSettings = { siteKey: '6LdMVz4UAAAAAClv3WheCRrgtoDyPUtFfGhikGu4' };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    QuestionRoutingModule,
    QuestionMaterialModule,
    SharedModule
  ],
  declarations: [
    COMPONENTS,
    CONTAINERS
  ],
  providers: [
    RESOLVERS,
    {provide: RECAPTCHA_SETTINGS, useValue: GLOBAL_RECAPTCHA_SETTINGS}, // Google reCaptcha settings
  ]
})
export class QuestionModule { }
