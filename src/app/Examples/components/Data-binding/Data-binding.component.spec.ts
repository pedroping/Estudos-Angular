/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataBindingComponent } from './Data-binding.component';

describe('DataBindingComponent', () => {
  let component: DataBindingComponent;
  let fixture: ComponentFixture<DataBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataBindingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
