import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBlogComponent } from './pending-blog.component';

describe('PendingBlogComponent', () => {
  let component: PendingBlogComponent;
  let fixture: ComponentFixture<PendingBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
