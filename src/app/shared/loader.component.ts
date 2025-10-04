import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../core/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule],
  templateUrl:"./loader.component.html"
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
