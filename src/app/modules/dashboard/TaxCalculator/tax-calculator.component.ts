import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-tax-calculator',
    templateUrl: './tax-calculator.component.html',
    imports: [RouterOutlet],
    standalone:true
})
export class TaxCalculatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
