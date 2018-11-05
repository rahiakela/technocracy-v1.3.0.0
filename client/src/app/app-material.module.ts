import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class AppMaterialModule { }
