import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuSetupPage } from './menu-setup.page';

const routes: Routes = [

  { path: '', redirectTo: '/home/products/categories', pathMatch: 'full' },
 
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'all-items',
    loadChildren: () => import('./pages/all-items/all-items.module').then( m => m.AllItemsPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./pages/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'categories-modal',
    loadChildren: () => import('./pages/categories-modal/categories-modal.module').then( m => m.CategoriesModalPageModule)
  },
  {
    path: 'new-item',
    loadChildren: () => import('./pages/item-creation/item-creation.module').then( m => m.ItemCreationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSetupPageRoutingModule {}
