import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {COMPONENTS} from "./components";
import {CONTAINERS} from "./containers";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileMaterialModule} from "./profile-material.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ProfileMaterialModule,
    SharedModule
  ],
  declarations: [
    COMPONENTS,
    CONTAINERS
  ]
})
export class ProfileModule { }
