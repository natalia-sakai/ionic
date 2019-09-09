import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentNativeFlashPage } from './component-native-flash.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentNativeFlashPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentNativeFlashPage]
})
export class ComponentNativeFlashPageModule {}
