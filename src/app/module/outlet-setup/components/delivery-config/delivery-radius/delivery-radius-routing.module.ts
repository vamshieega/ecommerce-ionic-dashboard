import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryRadiusPage } from './delivery-radius.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryRadiusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRadiusPageRoutingModule {}
