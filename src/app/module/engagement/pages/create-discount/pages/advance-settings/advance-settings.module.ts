import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvanceSettingsPageRoutingModule } from './advance-settings-routing.module';

import { AdvanceSettingsPage } from './advance-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdvanceSettingsPageRoutingModule
  ],
  declarations: [AdvanceSettingsPage]
})
export class AdvanceSettingsPageModule {}
