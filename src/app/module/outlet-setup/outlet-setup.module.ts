import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OutletSetupPage } from './outlet-setup.page';
import { OutletSetupRoutingModule } from './outlet-setup-routing.module';
import { BasicDetailsModule } from './components/basci-details/basic-details.module';
import { OutletOperationalTimingModule } from './components/outet-operational-timing/outlet-operational-timing.module';
import { FssaiPageModule } from './components/fssai/fssai.module';
import { BillingAndTaxesPageModule } from './components/billing-and-taxes/billing-and-taxes.module';
import { BankDetailsPageModule } from './components/bank-details/bank-details.module';
import { DeliveryConfigPageModule } from './components/delivery-config/delivery-config.module';
import { OrderConfigPageModule } from './components/order-config/order-config.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OutletSetupRoutingModule,
    BasicDetailsModule,
    OutletOperationalTimingModule,
    FssaiPageModule,
    BillingAndTaxesPageModule,
    BankDetailsPageModule,
    DeliveryConfigPageModule,
    OrderConfigPageModule
  ],
  declarations: [OutletSetupPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class OutletSetupModule {}
