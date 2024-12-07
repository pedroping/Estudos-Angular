/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CdkTableExampleComponent } from './cdk-Table-Example.component';

describe('CdkTableExampleComponent', () => {
  let component: CdkTableExampleComponent;
  let fixture: ComponentFixture<CdkTableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CdkTableExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkTableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
