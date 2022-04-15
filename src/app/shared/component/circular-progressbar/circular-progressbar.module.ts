import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircularProgressbarPageRoutingModule } from './circular-progressbar-routing.module';

import { CircularProgressbarPage } from './circular-progressbar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircularProgressbarPageRoutingModule
  ],
  declarations: [CircularProgressbarPage]
})
export class CircularProgressbarPageModule {}
