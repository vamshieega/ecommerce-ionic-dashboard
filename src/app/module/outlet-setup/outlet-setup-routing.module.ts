import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutletSetupPage } from './outlet-setup.page';

const routes: Routes = [
  {
    path: '',
    component: OutletSetupPage,
  },
  {
    path: 'manage-address',
    loadChildren: () =>
      import('./components/manage-address/manage-address.module').then(
        (m) => m.ManageAddressModule
      ),
  },
  {
    path: 'custom-timing',
    loadChildren: () =>
      import('./components/custom-timing/custom-timing.module').then(
        (m) => m.CustomTimingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletSetupRoutingModule {}
