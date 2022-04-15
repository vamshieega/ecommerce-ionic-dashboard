import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletCloseModalPage } from './outlet-close-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OutletCloseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletCloseModalPageRoutingModule {}
