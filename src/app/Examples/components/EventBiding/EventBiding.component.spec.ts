/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventBidingComponent } from './EventBiding.component';

describe('EventBidingComponent', () => {
  let component: EventBidingComponent;
  let fixture: ComponentFixture<EventBidingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventBidingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
