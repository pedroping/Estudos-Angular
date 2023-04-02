/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColunasComponent } from './colunas.component';

describe('ColunasComponent', () => {
  let component: ColunasComponent;
  let fixture: ComponentFixture<ColunasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColunasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
