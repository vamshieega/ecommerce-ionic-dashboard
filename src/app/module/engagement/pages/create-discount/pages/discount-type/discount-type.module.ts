import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountTypePageRoutingModule } from './discount-type-routing.module';

import { DiscountTypePage } from './discount-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DiscountTypePageRoutingModule
  ],
  declarations: [DiscountTypePage]
})
export class DiscountTypePageModule {}
