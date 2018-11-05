import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {blogReducer} from './blog-reducer';
import {EffectsModule} from '@ngrx/effects';
import {BlogEffects} from './blog-effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('blog', blogReducer),
    EffectsModule.forFeature([BlogEffects])
  ],
  declarations: [],
  providers: [BlogEffects]
})
export class BlogStoreModule { }
