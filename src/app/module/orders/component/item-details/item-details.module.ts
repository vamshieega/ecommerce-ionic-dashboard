import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsPageRoutingModule } from './item-details-routing.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailsPageRoutingModule
  ]
})
export class ItemDetailsPageModule {}
