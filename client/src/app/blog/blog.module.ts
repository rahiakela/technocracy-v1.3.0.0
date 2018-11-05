import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import {RESOLVERS} from './resolver';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BlogMaterialModule } from './blog-material.module';
import {CONTAINERS} from "./containers";
import {COMPONENTS} from "./components";
import {RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {RecaptchaFormsModule} from "ng-recaptcha/forms";
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';

// ref: https://www.npmjs.com/package/ng-recaptcha
const GLOBAL_RECAPTCHA_SETTINGS: RecaptchaSettings = { siteKey: '6LdMVz4UAAAAAClv3WheCRrgtoDyPUtFfGhikGu4' };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    BlogRoutingModule,
    SharedModule,
    BlogMaterialModule
  ],
  declarations: [
    CONTAINERS,
    COMPONENTS,
    BlogPreviewComponent,
    EditBlogComponent,
  ],
  providers: [
    RESOLVERS,
    {provide: RECAPTCHA_SETTINGS, useValue: GLOBAL_RECAPTCHA_SETTINGS}, // Google reCaptcha settings
  ]
})
export class BlogModule { }
