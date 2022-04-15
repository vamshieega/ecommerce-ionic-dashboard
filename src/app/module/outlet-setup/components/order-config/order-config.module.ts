import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfigPageRoutingModule } from './order-config-routing.module';

import { OrderConfigPage } from './order-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderConfigPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OrderConfigPage],
  exports: [OrderConfigPage],
  entryComponents: [OrderConfigPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class OrderConfigPageModule {}
