import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemViewModalPageRoutingModule } from './item-view-modal-routing.module';

import { ItemViewModalPage } from './item-view-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemViewModalPageRoutingModule
  ],
  declarations: [ItemViewModalPage]
})
export class ItemViewModalPageModule {}
