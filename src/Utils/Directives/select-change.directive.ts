// select-change.directive.ts
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSelectChange]'
})
export class SelectChangeDirective {
  @Output() appSelectChange = new EventEmitter<string>();

  constructor(private el: ElementRef<HTMLSelectElement>) {}

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.appSelectChange.emit(value);
  }
}
