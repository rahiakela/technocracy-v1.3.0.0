import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {questionReducer} from './question-reducer';
import {EffectsModule} from '@ngrx/effects';
import {QuestionEffects} from './question-effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('question', questionReducer),
    EffectsModule.forFeature([QuestionEffects])
  ],
  declarations: [],
  providers: [QuestionEffects]
})
export class QuestionStoreModule { }
