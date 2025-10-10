import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './error.component.html',
})
export class ErrorComponent {}
