import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentNativeFlashPage } from './component-native-flash.page';

describe('ComponentNativeFlashPage', () => {
  let component: ComponentNativeFlashPage;
  let fixture: ComponentFixture<ComponentNativeFlashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentNativeFlashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentNativeFlashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
