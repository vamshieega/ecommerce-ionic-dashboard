import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpPageRoutingModule } from './otp-routing.module';
import { OtpPage } from './otp.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    OtpPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OtpPage],
  exports: [
    OtpPage
  ],
  entryComponents: [
    OtpPage
  ]
})
export class OtpPageModule { }
