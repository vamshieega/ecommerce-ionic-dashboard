import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DaywiseOphoursPage } from './daywise-ophours.page';

@NgModule({
  declarations: [DaywiseOphoursPage],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [DaywiseOphoursPage],
  entryComponents: [DaywiseOphoursPage],
})
export class DaywiseOphoursModule {}
