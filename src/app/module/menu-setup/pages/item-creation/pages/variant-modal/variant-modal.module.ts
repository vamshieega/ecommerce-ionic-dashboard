import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VariantModalPageRoutingModule } from './variant-modal-routing.module';

import { VariantModalPage } from './variant-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VariantModalPageRoutingModule
  ],
  declarations: [VariantModalPage]
})
export class VariantModalPageModule {}
