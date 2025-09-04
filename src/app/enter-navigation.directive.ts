// enter-navigation.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appEnterNavigation]'
})
export class EnterNavigationDirective {

  constructor(
    private el: ElementRef,
    private ngControl: NgControl
  ) {}

  @HostListener('keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent): void {
    event.preventDefault();

    // Trigger validation by marking field as touched and dirty
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.markAsTouched();
      this.ngControl.control.markAsDirty();
      this.ngControl.control.updateValueAndValidity();

      // If current field has errors, don't navigate to next field
      if (this.ngControl.control.invalid) {
        return; // Stay on current field to show error
      }
    }

    const form = this.el.nativeElement.closest('form');
    if (!form) return;

    const focusableElements = form.querySelectorAll(
      'input:not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const focusableArray = Array.from(focusableElements) as HTMLElement[];
    const currentIndex = focusableArray.indexOf(this.el.nativeElement);

    if (currentIndex > -1 && currentIndex < focusableArray.length - 1) {
      focusableArray[currentIndex + 1].focus();
    }
  }
}
