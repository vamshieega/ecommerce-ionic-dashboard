import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnCallOrderPage } from './on-call-order.page';

const routes: Routes = [
  {
    path: '',
    component: OnCallOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnCallOrderPageRoutingModule {}
