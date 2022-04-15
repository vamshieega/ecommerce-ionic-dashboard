import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreatePasswordPageRoutingModule } from './create-password-routing.module';

import { CreatePasswordPage } from './create-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreatePasswordPageRoutingModule
  ],
  declarations: [CreatePasswordPage]
})
export class CreatePasswordPageModule {}
