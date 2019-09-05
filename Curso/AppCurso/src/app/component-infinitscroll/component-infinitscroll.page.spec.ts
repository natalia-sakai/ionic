import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInfinitscrollPage } from './component-infinitscroll.page';

describe('ComponentInfinitscrollPage', () => {
  let component: ComponentInfinitscrollPage;
  let fixture: ComponentFixture<ComponentInfinitscrollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentInfinitscrollPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentInfinitscrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
