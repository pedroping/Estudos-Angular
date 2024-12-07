/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaginaProtegidaComponent } from './paginaProtegida.component';

describe('PaginaProtegidaComponent', () => {
  let component: PaginaProtegidaComponent;
  let fixture: ComponentFixture<PaginaProtegidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaginaProtegidaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaProtegidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
