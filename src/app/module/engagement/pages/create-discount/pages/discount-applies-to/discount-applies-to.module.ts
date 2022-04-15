import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountAppliesToPageRoutingModule } from './discount-applies-to-routing.module';

import { DiscountAppliesToPage } from './discount-applies-to.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DiscountAppliesToPageRoutingModule
  ],
  declarations: [DiscountAppliesToPage]
})
export class DiscountAppliesToPageModule {}
