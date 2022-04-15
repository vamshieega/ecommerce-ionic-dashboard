import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletModalPageRoutingModule } from './outlet-modal-routing.module';

import { OutletModalPage } from './outlet-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletModalPageRoutingModule
  ],
  declarations: [OutletModalPage]
})
export class OutletModalPageModule {}
