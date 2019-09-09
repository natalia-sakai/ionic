import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentNativeTexttospeechPage } from './component-native-texttospeech.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentNativeTexttospeechPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentNativeTexttospeechPage]
})
export class ComponentNativeTexttospeechPageModule {}
