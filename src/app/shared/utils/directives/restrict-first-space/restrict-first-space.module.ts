import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestrictFirstSpaceDirective } from './restrict-first-space.directive';



@NgModule({
  declarations: [RestrictFirstSpaceDirective],
  imports: [
    CommonModule
  ],
  exports: [RestrictFirstSpaceDirective]
})
export class RestrictFirstSpaceModule { }
