import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargesPageRoutingModule } from './charges-routing.module';

import { ChargesPage } from './charges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChargesPageRoutingModule
  ],
  declarations: [ChargesPage]
})
export class ChargesPageModule {}
