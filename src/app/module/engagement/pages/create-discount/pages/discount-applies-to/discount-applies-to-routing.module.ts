import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountAppliesToPage } from './discount-applies-to.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountAppliesToPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountAppliesToPageRoutingModule {}
