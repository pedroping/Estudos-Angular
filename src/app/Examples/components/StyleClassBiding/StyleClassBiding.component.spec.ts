/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StyleClassBidingComponent } from './StyleClassBiding.component';

describe('StyleClassBidingComponent', () => {
  let component: StyleClassBidingComponent;
  let fixture: ComponentFixture<StyleClassBidingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StyleClassBidingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleClassBidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
