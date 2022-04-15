import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemSearchModalPageRoutingModule } from './item-search-modal-routing.module';

import { ItemSearchModalPage } from './item-search-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ItemSearchModalPageRoutingModule
  ],
  declarations: [ItemSearchModalPage]
})
export class ItemSearchModalPageModule {}
