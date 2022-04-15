import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordShowHideDirective } from './password-show-hide-directive.directive';



@NgModule({
  declarations: [PasswordShowHideDirective],
  imports: [
    CommonModule
  ],
  exports: [PasswordShowHideDirective]
})
export class PasswordShowHideDirectiveModule { }
