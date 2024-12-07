/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClosedSidenavComponent } from './closed-sidenav.component';

describe('ClosedSidenavComponent', () => {
  let component: ClosedSidenavComponent;
  let fixture: ComponentFixture<ClosedSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClosedSidenavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
