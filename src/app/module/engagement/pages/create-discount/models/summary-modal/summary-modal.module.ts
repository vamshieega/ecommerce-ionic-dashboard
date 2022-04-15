import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryModalPageRoutingModule } from './summary-modal-routing.module';

import { SummaryModalPage } from './summary-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryModalPageRoutingModule
  ],
  declarations: [SummaryModalPage]
})
export class SummaryModalPageModule {}
