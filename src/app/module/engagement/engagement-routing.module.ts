import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngagementPage } from './engagement.page';

const routes: Routes = [
  {
    path: '',
    component: EngagementPage
  },
  {
    path: 'discount',
    loadChildren: () => import('./pages/discount/discount.module').then( m => m.DiscountPageModule)
  },
  {
    path: 'create-discount',
    loadChildren: () => import('./pages/create-discount/create-discount.module').then( m => m.CreateDiscountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngagementPageRoutingModule {}
