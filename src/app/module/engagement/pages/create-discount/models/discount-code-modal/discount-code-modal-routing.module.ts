import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountCodeModalPage } from './discount-code-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountCodeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountCodeModalPageRoutingModule {}
