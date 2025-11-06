import { Directive, ElementRef, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: true
})
export class CurrencyFormatDirective {
  @Input() currency: string = 'NGN'; // Default currency
  @Input() locale: string = 'en-NG'; // Default locale

  constructor(private el: ElementRef<HTMLInputElement>, @Optional() @Self() private control: NgControl) {}

  // Helper: count digits (for cursor handling)
  private countDigits(str: string) {
    return (str.match(/\d/g) || []).length;
  }

  // --------------------------
  // Live formatting while typing
  // --------------------------
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.type !== 'text') return; // must be text

    const cursorStart = input.selectionStart ?? 0;
    const oldValue = input.value;

    // Remove everything except digits and dot
    const clean = oldValue.replace(/[^0-9.]/g, '');

    // Split integer and decimal parts
    const [intPart, decPart] = clean.split('.');

    // Format integer part with commas
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine integer + decimal (decimal typed is preserved)
    const formatted = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;



    // Update form control numeric value
    const numericValue = parseFloat(clean);
    this.control?.control?.setValue(isNaN(numericValue) ? null : numericValue, { emitEvent: false });

    // Delay setting formatted display to next JS tick
    setTimeout(() => {
    input.value = formatted;
    }, 0);

    // Restore cursor position
    const newCursor = cursorStart + (formatted.length - oldValue.length);
    setTimeout(() => {
      try {
        input.setSelectionRange(newCursor, newCursor);
      } catch {}
    });
  }

  // --------------------------
  // Format fully on blur with currency symbol
  // --------------------------
  @HostListener('blur')
  onBlur() {
    const val = this.control?.control?.value;
    if (val != null) {
      this.el.nativeElement.value = new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: this.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(val);
    }
  }

  // --------------------------
  // Optional: remove currency formatting on focus for easier editing
  // --------------------------
  @HostListener('focus')
  onFocus() {
    const val = this.control?.control?.value;
    if (val != null) {
      this.el.nativeElement.value = val.toString();
      setTimeout(() => this.el.nativeElement.select());
    }
  }
}
