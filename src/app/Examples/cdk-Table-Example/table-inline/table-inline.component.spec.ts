/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableInlineComponent } from './table-inline.component';

describe('TableInlineComponent', () => {
  let component: TableInlineComponent<any>;
  let fixture: ComponentFixture<TableInlineComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TableInlineComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
