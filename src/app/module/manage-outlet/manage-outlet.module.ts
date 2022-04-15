import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ManageOutletPageRoutingModule } from './manage-outlet-routing.module';

import { ManageOutletPage } from './manage-outlet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageOutletPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ManageOutletPage]
})
export class ManageOutletPageModule {}
