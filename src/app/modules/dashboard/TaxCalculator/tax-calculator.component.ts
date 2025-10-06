import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TaxData, EntityType } from './tax.model';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './tax-calculator.component.html',
})
export class TaxCalculatorComponent {
  taxForm: FormGroup;
  titleForm: FormGroup;
  categoryForm: FormGroup;

  taxResult = signal<number | null>(null);

  calculationMode: 'byTitle' | 'byCategory' | 'byEntity' = 'byEntity';

  taxData: TaxData = {
    Individuals: {
      WhiteCollar: { SalaryRange: '₦800,000 - ₦6,000,000', TaxCategories: ['PIT', 'VAT'], Roles: ['Administrative Assistant', 'Office Manager'] },
      CorporateExecutives: { SalaryRange: '₦6,000,000 - ₦50,000,000+', TaxCategories: ['PIT', 'VAT', 'CGT'], Roles: ['CEO', 'CFO'] },
      FreelancersSelfEmployed: { SalaryRange: '₦300,000 - ₦2,500,000', TaxCategories: ['PIT', 'VAT', 'Digital Tax'], Roles: ['Tailor', 'Welder'] },
      BlueCollar: { SalaryRange: '₦150,000 - ₦800,000', TaxCategories: ['PIT', 'VAT'], Roles: ['Mechanic', 'Bus Driver'] },
      DigitalEconomyWorkers: { SalaryRange: '₦500,000 - ₦10,000,000+', TaxCategories: ['PIT', 'CGT', 'VAT'], Roles: ['Crypto Trader', 'Influencer'] },
    },
    Businesses: {
      EntrepreneursSMEs: { TurnoverRange: '₦5,000,000 - ₦100,000,000', TaxCategories: ['CIT', 'VAT', 'Development Levy'], Roles: ['Boutique Owner', 'Tech Startup Owner'] },
      LargeCompanies: { TurnoverRange: '₦100,000,000+', TaxCategories: ['CIT', 'VAT', 'ETR', 'CGT'], Roles: ['Oil & Gas Firm', 'Telecom Company'] },
    },
  };

 allTaxCategories = [...new Set(
    Object.values(this.taxData.Individuals).flatMap(c => c.TaxCategories)
    .concat(Object.values(this.taxData.Businesses).flatMap(c => c.TaxCategories))
  )];

  Roles: string[] = [];
 
  constructor(private fb: FormBuilder) {
    // Entity-based form
    this.taxForm = this.fb.group({ entityType: ['Individuals'], category: [''], role: [''], income: [0] });
    // By role form
    this.titleForm = this.fb.group({ role: [''], income: [0] });
    // By category form
    this.categoryForm = this.fb.group({ category: [''], income: [0] });

     this.Roles = this.extractAllRoles(this.taxData);
  }

  extractAllRoles(data: any): string[] {
    const roles: string[] = [];

    // Extract roles from Individuals
    for (let key in data.Individuals) {
      if (data.Individuals[key].Roles) {
        roles.push(...data.Individuals[key].Roles);
      }
    }

    // Extract roles from Businesses
    for (let key in data.Businesses) {
      if (data.Businesses[key].Roles) {
        roles.push(...data.Businesses[key].Roles);
      }
    }

    // Remove duplicates and return
    return [...new Set(roles)];
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
  if (!cat || !cat.Roles) return [];

  // Map Role objects to strings if necessary
  return cat.Roles.map(role => {
    if (typeof role === 'string') return role;
    return role.title; // Role object, extract title
  });
}


  // Entity-based calculation
  calculateByEntity() {
    const income = Number(this.taxForm.value.income);
    const entityType = this.taxForm.value.entityType;
    let taxRate = 0;

    if (entityType === 'Individuals') {
      taxRate = income < 500_000 ? 5 : income < 5_000_000 ? 10 : 15;
    } else {
      taxRate = income < 100_000_000 ? 20 : 30;
    }

    this.taxResult.set((taxRate / 100) * income);
  }

calculateByTitle() {
  const { role, income } = this.titleForm.value;

  // Flatten all roles from Individuals and Businesses
  const allRoles: string[] = Object.values(this.taxData.Individuals)
    .flatMap(c => c.Roles.map(r => typeof r === 'string' ? r : r.title))
    .concat(
      Object.values(this.taxData.Businesses)
        .flatMap(c => c.Roles.map(r => typeof r === 'string' ? r : r.title))
    );

  const found = allRoles.find(r => r.toLowerCase() === role.toLowerCase());

  if (found) {
    const tax = Number(income) * 0.05; // Apply 5% tax
    this.taxResult.set(tax);
  } else {
    this.taxResult.set(0);
  }
}



  // Calculation by Tax Category
  calculateByCategory() {
    const { category, income } = this.categoryForm.value;
    const allCategories = { ...this.taxData.Individuals, ...this.taxData.Businesses };
    const cat = allCategories[category];
    this.taxResult.set(cat?.TaxCategories.includes('PIT') ? Number(income) * 0.05 : 0);
  }

  calculate() {
    switch (this.calculationMode) {
      case 'byTitle': this.calculateByTitle(); break;
      case 'byCategory': this.calculateByCategory(); break;
      default: this.calculateByEntity();
    }
  }

  public calculateTax() {
  const income = Number(this.taxForm.value.income);
  const entityType = this.taxForm.value.entityType;

  let taxRate = 0;

  if (entityType === 'Individuals') {
    if (income < 500_000) taxRate = 5;
    else if (income < 5_000_000) taxRate = 10;
    else taxRate = 15;
  } else {
    if (income < 100_000_000) taxRate = 20;
    else taxRate = 30;
  }

  this.taxResult.set((taxRate / 100) * income);
}

}
