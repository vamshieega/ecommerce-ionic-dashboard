import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletProductsAndCollectionsModalPage } from './outlet-products-and-collections-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OutletProductsAndCollectionsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletProductsAndCollectionsModalPageRoutingModule {}
