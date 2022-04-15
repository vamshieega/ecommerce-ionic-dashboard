import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryServicePage } from './delivery-service.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryServicePageRoutingModule {}
