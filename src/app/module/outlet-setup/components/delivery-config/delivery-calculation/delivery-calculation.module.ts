import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryCalculationPageRoutingModule } from './delivery-calculation-routing.module';

import { DeliveryCalculationPage } from './delivery-calculation.page';
import { DeliveryPriceRangePageModule } from '../delivery-price-range/delivery-price-range.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryCalculationPageRoutingModule,
    ReactiveFormsModule,
    DeliveryPriceRangePageModule
  ],
  declarations: [DeliveryCalculationPage],
})
export class DeliveryCalculationPageModule {}
