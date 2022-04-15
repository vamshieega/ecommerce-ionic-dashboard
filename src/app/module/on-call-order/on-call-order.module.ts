import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnCallOrderPageRoutingModule } from './on-call-order-routing.module';

import { OnCallOrderPage } from './on-call-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnCallOrderPageRoutingModule
  ],
  declarations: [OnCallOrderPage]
})
export class OnCallOrderPageModule {}
