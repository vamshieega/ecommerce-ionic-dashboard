import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryModalPage } from './summary-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryModalPageRoutingModule {}
