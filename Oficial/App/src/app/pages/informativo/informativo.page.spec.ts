import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativoPage } from './informativo.page';

describe('InformativoPage', () => {
  let component: InformativoPage;
  let fixture: ComponentFixture<InformativoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformativoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
