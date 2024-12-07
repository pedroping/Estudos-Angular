/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormExampleComponent } from './formExample.component';

describe('FormExampleComponent', () => {
  let component: FormExampleComponent;
  let fixture: ComponentFixture<FormExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
