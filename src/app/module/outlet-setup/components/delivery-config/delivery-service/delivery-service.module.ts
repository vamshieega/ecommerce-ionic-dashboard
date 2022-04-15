import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryServicePageRoutingModule } from './delivery-service-routing.module';

import { DeliveryServicePage } from './delivery-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryServicePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DeliveryServicePage]
})
export class DeliveryServicePageModule {}
