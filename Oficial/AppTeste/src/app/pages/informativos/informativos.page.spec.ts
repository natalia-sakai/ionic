import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativosPage } from './informativos.page';

describe('InformativosPage', () => {
  let component: InformativosPage;
  let fixture: ComponentFixture<InformativosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformativosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
