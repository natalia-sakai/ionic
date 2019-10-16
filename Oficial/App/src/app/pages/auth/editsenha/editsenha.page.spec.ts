import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsenhaPage } from './editsenha.page';

describe('EditsenhaPage', () => {
  let component: EditsenhaPage;
  let fixture: ComponentFixture<EditsenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsenhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
