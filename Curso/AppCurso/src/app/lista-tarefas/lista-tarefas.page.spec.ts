import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasPage } from './lista-tarefas.page';

describe('ListaTarefasPage', () => {
  let component: ListaTarefasPage;
  let fixture: ComponentFixture<ListaTarefasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTarefasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
