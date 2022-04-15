import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgFallbackDirective } from './img-fallback.directive';
const CUSTOM_DIRECTIVE = [
  ImgFallbackDirective,
]

@NgModule({
  declarations: [
    CUSTOM_DIRECTIVE,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CUSTOM_DIRECTIVE
  ]
})
export class CustomDirectiveModule { }
