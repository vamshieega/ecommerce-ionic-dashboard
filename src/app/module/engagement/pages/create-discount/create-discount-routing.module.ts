import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDiscountPage } from './create-discount.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDiscountPage
  },
  {
    path: 'discount-type',
    loadChildren: () => import('./pages/discount-type/discount-type.module').then(m => m.DiscountTypePageModule)
  },
  {
    path: 'discount-schedule',
    loadChildren: () => import('./pages/discount-schedule/discount-schedule.module').then( m => m.DiscountSchedulePageModule)
  },
  {
    path: 'outlet-products-and-collections-modal',
    loadChildren: () => import('./models/outlet-products-and-collections-modal/outlet-products-and-collections-modal.module').then( m => m.OutletProductsAndCollectionsModalPageModule)
  },
  {
    path: 'discount-code-modal',
    loadChildren: () => import('./models/discount-code-modal/discount-code-modal.module').then( m => m.DiscountCodeModalPageModule)
  },
  {
    path: 'applies-to',
    loadChildren: () => import('./pages/discount-applies-to/discount-applies-to.module').then( m => m.DiscountAppliesToPageModule)
  },  {
    path: 'summary-modal',
    loadChildren: () => import('./models/summary-modal/summary-modal.module').then( m => m.SummaryModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDiscountPageRoutingModule { }
