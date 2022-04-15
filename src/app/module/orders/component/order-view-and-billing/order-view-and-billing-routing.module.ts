import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderViewAndBillingPage } from './order-view-and-billing.page';

const routes: Routes = [
  {
    path: '',
    component: OrderViewAndBillingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderViewAndBillingPageRoutingModule {}
