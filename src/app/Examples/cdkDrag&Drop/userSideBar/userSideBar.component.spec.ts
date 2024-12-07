/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserSideBarComponent } from './userSideBar.component';

describe('UserSideBarComponent', () => {
  let component: UserSideBarComponent;
  let fixture: ComponentFixture<UserSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserSideBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
