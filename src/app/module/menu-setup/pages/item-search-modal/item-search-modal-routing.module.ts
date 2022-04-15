import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemSearchModalPage } from './item-search-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ItemSearchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemSearchModalPageRoutingModule {}
