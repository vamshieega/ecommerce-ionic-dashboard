import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircularProgressbarPage } from './circular-progressbar.page';

const routes: Routes = [
  {
    path: '',
    component: CircularProgressbarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircularProgressbarPageRoutingModule {}
