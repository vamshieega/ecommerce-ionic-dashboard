import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutetOperationalTimingPage } from './outet-operational-timing.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationalTimingModule } from '../operational-timing/operational-timing.module';
import { DaywiseOphoursModule } from 'src/app/shared/component/daywise-ophours/daywise-ophours.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [OutetOperationalTimingPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OperationalTimingModule,
    DaywiseOphoursModule,
  ],
  exports: [OutetOperationalTimingPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class OutletOperationalTimingModule {}
