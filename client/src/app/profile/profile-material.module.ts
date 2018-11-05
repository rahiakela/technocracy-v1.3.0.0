import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule, MatSelectModule, MatTabsModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  declarations: []
})
export class ProfileMaterialModule { }
