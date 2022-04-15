import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[restrictFirstSpace]'
})
export class RestrictFirstSpaceDirective {
  private el: HTMLElement;
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: Event) {
    if (e['which'] === 32 && e.target['selectionStart'] === 0) {
      return false;
    }
  }
}
