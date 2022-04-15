import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTimingsPageRoutingModule } from './menu-timings-routing.module';

import { MenuTimingsPage } from './menu-timings.page';
import { OperationalTimingModule } from 'src/app/module/outlet-setup/components/operational-timing/operational-timing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MenuTimingsPageRoutingModule,OperationalTimingModule
  ],
  declarations: [MenuTimingsPage]
})
export class MenuTimingsPageModule {}
