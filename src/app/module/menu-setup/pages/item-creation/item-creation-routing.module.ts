import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemCreationPage } from './item-creation.page';

const routes: Routes = [
  {
    path: '',
    component: ItemCreationPage
  }
  ,
  {
    path: 'add-variant',
    loadChildren: () => import('./pages/add-variant/add-variant.module').then( m => m.AddVariantPageModule)
  },
  {
    path: 'add-addons',
    loadChildren: () => import('./pages/add-addons/add-addons.module').then( m => m.AddAddonsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemCreationPageRoutingModule {}
