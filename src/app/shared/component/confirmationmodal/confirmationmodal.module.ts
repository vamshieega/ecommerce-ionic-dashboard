import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmationmodalPageRoutingModule } from './confirmationmodal-routing.module';

import { ConfirmationmodalPage } from './confirmationmodal.page';

@NgModule({
  declarations: [ConfirmationmodalPage],
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmationmodalPageRoutingModule
  ],
  exports: [ConfirmationmodalPage], 
  entryComponents: [ConfirmationmodalPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ConfirmationmodalPageModule {}
