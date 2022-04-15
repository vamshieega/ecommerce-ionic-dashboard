import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingAndTaxesPage } from './billing-and-taxes.page';

const routes: Routes = [
  {
    path: '',
    component: BillingAndTaxesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingAndTaxesPageRoutingModule {}
