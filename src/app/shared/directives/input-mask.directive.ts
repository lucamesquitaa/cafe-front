import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { applyMask, MaskType } from '../utils/mask.util';

@Directive({
  selector: '[appMask]',
  standalone: false,
})
export class InputMaskDirective {

  @Input('appMask') maskType!: MaskType;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
  ) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const masked = applyMask(this.maskType, input.value);

    this.el.nativeElement.value = masked;
    this.ngControl.control?.setValue(masked, { emitModelToViewChange: false });
  }

  @HostListener('blur')
  onBlur(): void {
    this.ngControl.control?.markAsTouched();
  }
}
