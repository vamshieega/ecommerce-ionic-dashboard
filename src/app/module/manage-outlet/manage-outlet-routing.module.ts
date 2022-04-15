import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageOutletPage } from './manage-outlet.page';

const routes: Routes = [
  {
    path: '',
    component: ManageOutletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageOutletPageRoutingModule {}
