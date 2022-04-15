import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';

const routes: Routes = [


  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./component/order-detail/order-detail.module').then(m => m.OrderDetailPageModule)
  },
  {
    path: 'item-details',
    loadChildren: () => import('./component/item-details/item-details.module').then(m => m.ItemDetailsPageModule)
  },
  {
    path: 'order-view-and-billing',
    loadChildren: () => import('./component/order-view-and-billing/order-view-and-billing.module').then(m => m.OrderViewAndBillingPageModule)
  },

  {
    path: 'order-cancel',
    loadChildren: () => import('./component/order-cancel/order-cancel.module').then(m => m.OrderCancelPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule { }
