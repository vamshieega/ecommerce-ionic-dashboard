import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationmodalPage } from './confirmationmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationmodalPageRoutingModule {}
