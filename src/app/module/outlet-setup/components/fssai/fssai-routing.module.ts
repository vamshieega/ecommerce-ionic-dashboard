import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FssaiPage } from './fssai.page';

const routes: Routes = [
  {
    path: '',
    component: FssaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FssaiPageRoutingModule {}
