import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDatatimePage } from './component-datatime.page';

describe('ComponentDatatimePage', () => {
  let component: ComponentDatatimePage;
  let fixture: ComponentFixture<ComponentDatatimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDatatimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDatatimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
