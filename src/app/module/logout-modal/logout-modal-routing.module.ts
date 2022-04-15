import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutModalPage } from './logout-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LogoutModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutModalPageRoutingModule {}
