/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhotosDetailsComponent } from './photosDetails.component';

describe('PhotosDetailsComponent', () => {
  let component: PhotosDetailsComponent;
  let fixture: ComponentFixture<PhotosDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PhotosDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
