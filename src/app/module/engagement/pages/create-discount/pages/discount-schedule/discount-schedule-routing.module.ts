import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountSchedulePage } from './discount-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountSchedulePageRoutingModule {}
