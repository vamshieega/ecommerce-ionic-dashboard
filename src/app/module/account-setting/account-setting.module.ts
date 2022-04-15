import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSettingPageRoutingModule } from './account-setting-routing.module';

import { AccountSettingPage } from './account-setting.page';

import { ColorPickerModule } from 'ngx-color-picker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ColorPickerModule,
    AccountSettingPageRoutingModule
  ],
  declarations: [AccountSettingPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class AccountSettingPageModule {}
