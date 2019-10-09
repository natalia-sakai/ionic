import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditardadosPage } from './editardados.page';

describe('EditardadosPage', () => {
  let component: EditardadosPage;
  let fixture: ComponentFixture<EditardadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditardadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
