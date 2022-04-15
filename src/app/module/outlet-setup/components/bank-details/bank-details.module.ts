import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankDetailsPageRoutingModule } from './bank-details-routing.module';

import { BankDetailsPage } from './bank-details.page';
import { OnlyNumberModule } from 'src/app/shared/utils/directives/only-number/only-number.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankDetailsPageRoutingModule,
    ReactiveFormsModule,
    OnlyNumberModule
  ],
  declarations: [BankDetailsPage],
  exports: [BankDetailsPage],
  entryComponents: [BankDetailsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class BankDetailsPageModule {}
