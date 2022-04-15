import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTimingsPage } from './menu-timings.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTimingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTimingsPageRoutingModule {}
