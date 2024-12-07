import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appPassword]' })
export class PasswordDirective {
  constructor(private elRef: ElementRef) {}

  InputType: 'password' | 'text' = 'password';

  @HostListener('click', ['$event.target.id'])
  onClick(id: any) {
    if (this.InputType == 'password') {
      this.InputType = 'text';
      return;
    }
    this.InputType = 'password';
  }
}
