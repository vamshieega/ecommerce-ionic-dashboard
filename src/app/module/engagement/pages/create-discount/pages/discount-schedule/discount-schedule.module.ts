import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountSchedulePageRoutingModule } from './discount-schedule-routing.module';

import { DiscountSchedulePage } from './discount-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DiscountSchedulePageRoutingModule
  ],
  declarations: [DiscountSchedulePage]
})
export class DiscountSchedulePageModule {}
