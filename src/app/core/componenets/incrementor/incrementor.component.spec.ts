/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncrementorComponent } from './incrementor.component';

describe('IncrementorComponent', () => {
  let component: IncrementorComponent;
  let fixture: ComponentFixture<IncrementorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IncrementorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
