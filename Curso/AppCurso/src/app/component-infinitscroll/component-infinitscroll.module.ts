import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentInfinitscrollPage } from './component-infinitscroll.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentInfinitscrollPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentInfinitscrollPage]
})
export class ComponentInfinitscrollPageModule {}
