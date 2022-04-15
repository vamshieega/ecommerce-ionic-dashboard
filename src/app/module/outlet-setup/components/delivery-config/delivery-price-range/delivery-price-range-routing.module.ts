import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPriceRangePage } from './delivery-price-range.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPriceRangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPriceRangePageRoutingModule {}
