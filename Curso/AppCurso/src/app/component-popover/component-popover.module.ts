import { ComponentPopoverInternoComponent } from './../component-popover-interno/component-popover-interno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentPopoverPage } from './component-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentPopoverPage,ComponentPopoverInternoComponent],
  entryComponents: [ComponentPopoverInternoComponent]
})
export class ComponentPopoverPageModule {}
