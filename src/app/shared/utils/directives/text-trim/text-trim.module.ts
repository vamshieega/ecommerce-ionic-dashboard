import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextTrimDirective } from './text-trim.directive';



@NgModule({
  declarations: [TextTrimDirective],
  imports: [
    CommonModule
  ],
  exports: [TextTrimDirective]
})
export class TextTrimModule { }
