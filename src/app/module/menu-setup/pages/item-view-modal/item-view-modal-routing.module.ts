import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemViewModalPage } from './item-view-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ItemViewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemViewModalPageRoutingModule {}
