/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordShowHide]'
})
export class PasswordShowHideDirective {
  isVisible: boolean = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.createIcon();
  }

  createIcon() {
     const span = document.createElement('ion-input');
    span.className = 'icon-visibility_off hide-show-psd-css';
    // span.innerHTML = `Show`;
    this.renderer.addClass(span, 'hide-show-psd-css');
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
  }

  toggle(span) {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.renderer.setAttribute(this.el.nativeElement, 'type', 'text');

      // span.innerHTML = 'Hide';
      span.className = 'icon-visibility hide-show-psd-css';
    } else {
      this.renderer.setAttribute(this.el.nativeElement, 'type', 'password');
      // span.innerHTML = 'Show';
      span.className = 'icon-visibility_off hide-show-psd-css';

    }
  }

}
