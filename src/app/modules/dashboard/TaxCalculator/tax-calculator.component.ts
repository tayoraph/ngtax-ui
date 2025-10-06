// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//     selector: 'app-tax-calculator',
//     templateUrl: './tax-calculator.component.html',
//     imports: [RouterOutlet],
//     standalone:true
// })
// export class TaxCalculatorComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
 import { TaxData, EntityType, IndividualCategory, BusinessCategory } from './tax.model';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tax-calculator.component.html',
})
export class TaxCalculatorComponent {
  taxForm: FormGroup;
  taxResult = signal<number | null>(null);


taxData: TaxData = {
  Individuals: {
    WhiteCollar: {
      SalaryRange: '₦800,000 – ₦6,000,000 per year',
      TaxCategories: ['PIT', 'VAT'],
      Roles: ['Administrative Assistant', 'Office Manager']
    },
    CorporateExecutives: {
      SalaryRange: '₦6,000,000 – ₦50,000,000+ per year',
      TaxCategories: ['PIT', 'VAT', 'CGT'],
      Roles: ['CEO', 'CFO']
    },
    FreelancersSelfEmployed: {
      SalaryRange: '₦300,000 – ₦2,500,000 per year',
      TaxCategories: ['PIT', 'VAT', 'Digital Tax'],
      Roles: ['Tailor', 'Welder']
    },
    BlueCollar: {
      SalaryRange: '₦150,000 – ₦800,000 per year',
      TaxCategories: ['PIT', 'VAT'],
      Roles: ['Mechanic', 'Bus Driver']
    },
    DigitalEconomyWorkers: {
      SalaryRange: '₦500,000 – ₦10,000,000+ per year',
      TaxCategories: ['PIT', 'CGT', 'VAT'],
      Roles: ['Crypto Trader', 'Influencer']
    }
  },
  Businesses: {
    EntrepreneursSMEs: {
      TurnoverRange: '₦5,000,000 – ₦100,000,000 per year',
      TaxCategories: ['CIT', 'VAT', 'Development Levy'],
      Roles: ['Boutique Owner', 'Tech Startup Owner']
    },
    LargeCompanies: {
      TurnoverRange: '₦100,000,000+ per year',
      TaxCategories: ['CIT', 'Development Levy', 'VAT', 'ETR', 'CGT'],
      Roles: ['Oil & Gas Firm', 'Telecom Company']
    }
  }
};


  constructor(private fb: FormBuilder) {
    this.taxForm = this.fb.group({
      entityType: ['Individuals'],
      category: [''],
      role: [''],
      income: ['']
    });
  }

get categories(): string[] {
  const entityType = this.taxForm.value.entityType as EntityType;
  return Object.keys(this.taxData[entityType] || {});
}


 get roles(): string[] {
  const entityType = this.taxForm.value.entityType as EntityType;
  const category = this.taxForm.value.category;
  if (!category) return [];
  const cat = this.taxData[entityType][category];
  return cat?.Roles.map(role => typeof role === 'string' ? role : role.title) || [];
}


  calculateTax() {
    const income = Number(this.taxForm.value.income);
    const entityType = this.taxForm.value.entityType;

    let taxRate = 0;

    if (entityType === 'Individuals') {
      if (income < 500000) taxRate = 5;
      else if (income < 5000000) taxRate = 10;
      else taxRate = 15;
    } else {
      if (income < 100000000) taxRate = 20;
      else taxRate = 30;
    }

    this.taxResult.set((taxRate / 100) * income);
  }
}

