/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyTvComponent } from './my-tv.component';

describe('MyTvComponent', () => {
  let component: MyTvComponent;
  let fixture: ComponentFixture<MyTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
