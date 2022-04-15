import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletCloseModalPageRoutingModule } from './outlet-close-modal-routing.module';

import { OutletCloseModalPage } from './outlet-close-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletCloseModalPageRoutingModule
  ],
  declarations: [OutletCloseModalPage]
})
export class OutletCloseModalPageModule {}
