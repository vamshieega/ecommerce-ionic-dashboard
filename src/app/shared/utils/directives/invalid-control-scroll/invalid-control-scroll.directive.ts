import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { InvalidControlScrollContainerDirective } from './invalid-control-scroll-container.directive';

@Directive({
  selector: '[appInvalidControlScroll]'
})
export class InvalidControlScrollDirective {
  constructor(
    private el: ElementRef,
    private formGroupDir: FormGroupDirective,
    @Optional()
    private scrollContainerDir: InvalidControlScrollContainerDirective
  ) { }

  contextWindow:any = window;

  private get containerEl(): HTMLElement {
    return this.scrollContainerDir
      ? this.scrollContainerDir.containerEl
      : this.contextWindow;
      
  }
  @HostListener("ngSubmit") onSubmit() {
    if (this.formGroupDir.control.invalid) {
      this.scrollToFirstInvalidControl();
    }
    console.log(this.contextWindow)
  }

  @HostListener("click") save() {
    if (this.formGroupDir.control.invalid) {
      this.scrollToFirstInvalidControl();
    }
    console.log(this.contextWindow)
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      ".ng-invalid"
    );

    this.containerEl.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth"
    });

    fromEvent(this.containerEl, "scroll")
      .pipe(
        debounceTime(100),
        take(1)
      )
      .subscribe(() => firstInvalidControl.focus());
  }

  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    const controlElTop = controlEl.getBoundingClientRect().top;

    if (this.scrollContainerDir) {
      const containerTop = this.containerEl.getBoundingClientRect().top;
      const absoluteControlElTop = controlElTop + this.containerEl.scrollTop;

      return absoluteControlElTop - containerTop - labelOffset;
    } else {
      const absoluteControlElTop = controlElTop + window.scrollY;

      return absoluteControlElTop - labelOffset;
    }
  }
}
