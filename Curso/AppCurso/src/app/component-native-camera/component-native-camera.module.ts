import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentNativeCameraPage } from './component-native-camera.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentNativeCameraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentNativeCameraPage]
})
export class ComponentNativeCameraPageModule {}
