import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AllItemsPageRoutingModule } from './all-items-routing.module';
import { AllItemsPage } from './all-items.page';
import { ItemCreationPageModule } from '../item-creation/item-creation.module';
import { ItemPageModule } from '../item/item.module';
import { ItemSearchModalPageModule } from '../item-search-modal/item-search-modal.module';
import { ItemViewModalPageModule } from '../item-view-modal/item-view-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AllItemsPageRoutingModule,
    ItemPageModule,
    ItemCreationPageModule,
    ItemSearchModalPageModule,
    ItemViewModalPageModule
  ],
  declarations: [AllItemsPage]
})
export class AllItemsPageModule { }
