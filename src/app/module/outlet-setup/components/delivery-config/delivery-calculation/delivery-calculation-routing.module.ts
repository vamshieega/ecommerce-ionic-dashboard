import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryCalculationPage } from './delivery-calculation.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryCalculationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryCalculationPageRoutingModule {}
