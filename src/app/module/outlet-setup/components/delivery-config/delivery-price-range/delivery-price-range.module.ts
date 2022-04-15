import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryPriceRangePageRoutingModule } from './delivery-price-range-routing.module';

import { DeliveryPriceRangePage } from './delivery-price-range.page';
import { OnlyNumberModule } from 'src/app/shared/utils/directives/only-number/only-number.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryPriceRangePageRoutingModule,
    OnlyNumberModule,
    ReactiveFormsModule
  ],
  declarations: [DeliveryPriceRangePage],
  exports: [DeliveryPriceRangePage],
  entryComponents: [DeliveryPriceRangePage]
})
export class DeliveryPriceRangePageModule {}
