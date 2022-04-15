import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VariantModalPage } from './variant-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VariantModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VariantModalPageRoutingModule {}
