import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoDigitDecimalDirective } from './two-digit-decimal.directive';



@NgModule({
  declarations: [TwoDigitDecimalDirective],
  imports: [
    CommonModule
  ],
  exports: [TwoDigitDecimalDirective]
})
export class TwoDigitDecimalModule { }
