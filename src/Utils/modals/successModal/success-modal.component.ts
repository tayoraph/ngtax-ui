import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css',
  imports:[CommonModule]
})
export class SuccessModalComponent {
  @Input() title: string = 'Success';
  @Input() message?: string;
  @Input() show: boolean = false;
 @Input() data: Record<string, any> | null | undefined = undefined;
//   objectKeys = Object.keys;
   // Expose global helpers to the template
  Array = Array;
  /** Optional: icon type - success | error | info */
  @Input() type: 'success' | 'error' | 'info' = 'success';

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Icon & color logic
  get iconData() {
    switch (this.type) {
      case 'error':
        return {
          icon: '❌',
          color: 'text-red-600',
        };
      case 'info':
        return {
          icon: 'ℹ️',
          color: 'text-blue-600',
        };
      default:
        return {
          icon: '✅',
          color: 'text-[#008751]',
        };
    }
  }


isArrayOfObjects(arr: any[]): boolean {
  return arr.length > 0 && typeof arr[0] === 'object' && !Array.isArray(arr[0]);
}
}
