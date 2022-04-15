import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FssaiPageRoutingModule } from './fssai-routing.module';

import { FssaiPage } from './fssai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FssaiPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FssaiPage],
  exports: [FssaiPage],
  entryComponents: [FssaiPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class FssaiPageModule {}
