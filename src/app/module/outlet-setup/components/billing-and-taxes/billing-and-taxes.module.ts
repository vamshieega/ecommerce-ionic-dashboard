import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillingAndTaxesPageRoutingModule } from './billing-and-taxes-routing.module';
import { BillingAndTaxesPage } from './billing-and-taxes.page';


@NgModule({
  declarations: [BillingAndTaxesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingAndTaxesPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [BillingAndTaxesPage],
  entryComponents: [BillingAndTaxesPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class BillingAndTaxesPageModule {}
