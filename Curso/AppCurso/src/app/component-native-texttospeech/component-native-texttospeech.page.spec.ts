import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentNativeTexttospeechPage } from './component-native-texttospeech.page';

describe('ComponentNativeTexttospeechPage', () => {
  let component: ComponentNativeTexttospeechPage;
  let fixture: ComponentFixture<ComponentNativeTexttospeechPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentNativeTexttospeechPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentNativeTexttospeechPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
