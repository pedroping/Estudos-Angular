/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DFormComponent } from './dForm.component';

describe('DFormComponent', () => {
  let component: DFormComponent;
  let fixture: ComponentFixture<DFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
