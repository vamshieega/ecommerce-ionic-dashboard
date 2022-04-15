import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidControlScrollDirective } from './invalid-control-scroll.directive';
import { InvalidControlScrollContainerDirective } from './invalid-control-scroll-container.directive';



@NgModule({
  declarations: [
    InvalidControlScrollDirective,
    InvalidControlScrollContainerDirective],
  imports: [
    CommonModule
  ],
  exports: [
    InvalidControlScrollDirective,
    InvalidControlScrollContainerDirective
  ]
})
export class InvalidControlScrollModule { }
