import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVariantPageRoutingModule } from './add-variant-routing.module';

import { AddVariantPage } from './add-variant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddVariantPageRoutingModule
  ],
  declarations: [AddVariantPage]
})
export class AddVariantPageModule {}
