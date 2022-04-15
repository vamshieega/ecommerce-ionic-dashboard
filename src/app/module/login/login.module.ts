import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { FcmMessagingService } from 'src/app/shared/services/fcm-messaging.service';
import { AppData } from 'src/app/shared/services/app-data.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  providers: [FcmMessagingService, AppData],
  declarations: [LoginPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginPageModule { }
