import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicDetailsPageRoutingModule } from './basic-details-routing.module';

import { BasicDetailsPage } from './basic-details.page';
import { RestrictFirstSpaceModule } from 'src/app/shared/utils/directives/restrict-first-space/restrict-first-space.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestrictFirstSpaceModule,
    ReactiveFormsModule,
    BasicDetailsPageRoutingModule
  ],
  declarations: [BasicDetailsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class BasicDetailsPageModule {}
