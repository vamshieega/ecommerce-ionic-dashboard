import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryConfigPage } from './delivery-config.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryConfigPage
  },
  {
    path: 'delivery-service',
    loadChildren: () => import('./delivery-service/delivery-service.module').then( m => m.DeliveryServicePageModule)
  },
  {
    path: 'delivery-calculation',
    loadChildren: () => import('./delivery-calculation/delivery-calculation.module').then( m => m.DeliveryCalculationPageModule)
  },
  {
    path: 'delivery-price-range',
    loadChildren: () => import('./delivery-price-range/delivery-price-range.module').then( m => m.DeliveryPriceRangePageModule)
  },
  {
    path: 'delivery-radius',
    loadChildren: () => import('./delivery-radius/delivery-radius.module').then( m => m.DeliveryRadiusPageModule)
  },
  {
    path: 'outlet-close-modal',
    loadChildren: () => import('./outlet-close-modal/outlet-close-modal.module').then( m => m.OutletCloseModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryConfigPageRoutingModule {}
