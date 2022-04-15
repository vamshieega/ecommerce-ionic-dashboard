import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletModalPage } from './outlet-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OutletModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletModalPageRoutingModule {}
