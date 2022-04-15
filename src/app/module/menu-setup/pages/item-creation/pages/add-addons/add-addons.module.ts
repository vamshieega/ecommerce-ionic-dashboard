import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAddonsPageRoutingModule } from './add-addons-routing.module';

import { AddAddonsPage } from './add-addons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddAddonsPageRoutingModule
  ],
  declarations: [AddAddonsPage]
})
export class AddAddonsPageModule {}
