import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatPaginatorModule, MatTableModule
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
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  declarations: []
})
export class QuestionMaterialModule { }
