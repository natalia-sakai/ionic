import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgapePage } from './agape.page';

describe('AgapePage', () => {
  let component: AgapePage;
  let fixture: ComponentFixture<AgapePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgapePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgapePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
