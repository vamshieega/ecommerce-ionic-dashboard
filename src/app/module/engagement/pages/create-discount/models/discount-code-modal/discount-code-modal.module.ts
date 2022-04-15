import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountCodeModalPageRoutingModule } from './discount-code-modal-routing.module';

import { DiscountCodeModalPage } from './discount-code-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DiscountCodeModalPageRoutingModule
  ],
  declarations: [DiscountCodeModalPage]
})
export class DiscountCodeModalPageModule {}
