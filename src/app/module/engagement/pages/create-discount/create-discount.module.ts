import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDiscountPageRoutingModule } from './create-discount-routing.module';

import { CreateDiscountPage } from './create-discount.page';
import { AdvanceSettingsPage } from './pages/advance-settings/advance-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateDiscountPageRoutingModule
  ],
  declarations: [CreateDiscountPage,AdvanceSettingsPage]
})
export class CreateDiscountPageModule {}
