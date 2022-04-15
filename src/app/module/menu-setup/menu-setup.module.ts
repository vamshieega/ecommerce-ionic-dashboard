import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuSetupPageRoutingModule } from './menu-setup-routing.module';

import { MenuSetupPage } from './menu-setup.page';
import { AllItemsPageModule } from './pages/all-items/all-items.module';
import { CategoriesPageModule } from './pages/categories/categories.module';
import { ItemPageModule } from './pages/item/item.module';
import { ItemCreationPageModule } from './pages/item-creation/item-creation.module';
import { CategoriesModalPageModule } from './pages/categories-modal/categories-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllItemsPageModule,
    CategoriesPageModule,
    ItemPageModule,
    ItemCreationPageModule,
    CategoriesModalPageModule,
    MenuSetupPageRoutingModule
  ],
  declarations: [MenuSetupPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class MenuSetupPageModule {}
