import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdadosPage } from './editdados.page';

describe('EditdadosPage', () => {
  let component: EditdadosPage;
  let fixture: ComponentFixture<EditdadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
