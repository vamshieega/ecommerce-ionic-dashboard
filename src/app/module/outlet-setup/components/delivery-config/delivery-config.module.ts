import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryConfigPageRoutingModule } from './delivery-config-routing.module';

import { DeliveryConfigPage } from './delivery-config.page';
import { DaywiseOphoursModule } from 'src/app/shared/component/daywise-ophours/daywise-ophours.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryConfigPageRoutingModule,
    ReactiveFormsModule,
    DaywiseOphoursModule
  ],
  declarations: [DeliveryConfigPage],
  exports: [DeliveryConfigPage],
  entryComponents: [DeliveryConfigPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class DeliveryConfigPageModule {}
