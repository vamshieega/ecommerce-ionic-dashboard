import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderViewAndBillingPageRoutingModule } from './order-view-and-billing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderViewAndBillingPageRoutingModule
  ]
})
export class OrderViewAndBillingPageModule {}
