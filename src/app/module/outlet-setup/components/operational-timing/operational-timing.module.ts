import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OperationalTimingPage } from './operational-timing.page';

@NgModule({
  declarations: [OperationalTimingPage],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [OperationalTimingPage],
  entryComponents: [OperationalTimingPage],
})
export class OperationalTimingModule {}
