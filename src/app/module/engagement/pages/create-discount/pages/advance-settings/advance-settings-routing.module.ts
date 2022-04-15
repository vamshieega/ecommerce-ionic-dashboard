import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvanceSettingsPage } from './advance-settings.page';

const routes: Routes = [
  {
    path: '',
    component: AdvanceSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvanceSettingsPageRoutingModule {}
