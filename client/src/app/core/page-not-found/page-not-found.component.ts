import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'tech-page-not-found',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <mat-card class="tech-page-not-found-card">
        <mat-card-header class="tech-page-not-found-card-header">
          <mat-card-title><h3>Resource not available </h3></mat-card-title>
        </mat-card-header>

        <mat-divider></mat-divider>

        <mat-card-content class="tech-page-not-found-content">
          <p>The requested resource is not available right now.</p>
          <p>Please have a patience, we are working on this resource.</p>
        </mat-card-content>

        <mat-divider></mat-divider>

        <mat-card-actions>
          <button (click)="goBack()" class="tech-button" mat-button color="primary">
            Go Back
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      h3{
        color: #007db8;
      }
      .tech-page-not-found-card{
        margin-top: -15px;
        margin-bottom: 5px;
      }
      .tech-page-not-found-content{
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .tech-button{
        background-color: aliceblue;
      }
    `
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
}
