import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatPaginatorModule, MatTableModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule
  ],
  declarations: []
})
export class BlogMaterialModule { }
