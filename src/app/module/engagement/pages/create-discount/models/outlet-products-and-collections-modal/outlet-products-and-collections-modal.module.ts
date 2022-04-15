import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletProductsAndCollectionsModalPageRoutingModule } from './outlet-products-and-collections-modal-routing.module';

import { OutletProductsAndCollectionsModalPage } from './outlet-products-and-collections-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OutletProductsAndCollectionsModalPageRoutingModule
  ],
  declarations: [OutletProductsAndCollectionsModalPage]
})
export class OutletProductsAndCollectionsModalPageModule {}
