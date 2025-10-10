import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TaxData, EntityType, Role } from './tax.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { TaxReformService } from './tax.service';
import { Store } from '@ngrx/store';
import * as TaxReformActions from './store/actions';
import { 
  selectAllTaxData,
  selectCategoryData,
  selectRoleData,
  selectTaxCategoryData,
  selectLoading
} from './store/selectors';
import * as RolesActions from './store/roles/roles.actions';
import * as fromRoles from './store/roles/roles.selector';
import { filter, Observable, take } from 'rxjs';
import { RoleTax } from './models/role-tax.model';

import * as TaxSelectors from './store/role-tax/role.tax-selector';
import * as TaxActions from './store/role-tax/role.tax.action';
import { SuccessModalComponent } from 'src/Utils/modals/successModal/success-modal.component';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule,SuccessModalComponent, HttpClientModule],
  templateUrl: './tax-calculator.component.html',
})
export class TaxCalculatorComponent implements OnInit{
  taxForm: FormGroup;
  titleForm: FormGroup;
  categoryForm: FormGroup;

  taxResult = signal<number | null>(null);

  calculationMode: 'byTitle' | 'byCategory' | 'byEntity' = 'byTitle';

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

  Roles: Role[] = [];

  errorMessage = signal<string | null>(null);



  /////
  allData$ = this.store.select(selectAllTaxData);
  categoryData$ = this.store.select(selectCategoryData);
  roleData$ = this.store.select(selectRoleData);
  taxCategoryData$ = this.store.select(selectTaxCategoryData);
  loading$ = this.store.select(selectLoading);
  
  // roles
  roles$: Observable<Role[]> | undefined;

  role = '';
  income = 0;
    
  //modal
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalData: Record<string, any> | null = null;
  modalType: 'success' | 'error' | 'info' = 'success';

  formattedIncome: string = '';

 private taxService = inject(TaxReformService);

  constructor(private fb: FormBuilder, private store: Store) {
    // Entity-based form
    this.taxForm = this.fb.group({ entityType: ['Individuals'], category: [''], role: [''], income: [0] });
    // By role form
    this.titleForm = this.fb.group({ role: [''], income: [null] });
    // By category form
    this.categoryForm = this.fb.group({ category: [''], income: [0] });

     //this.Roles = this.extractAllRoles(this.taxData);
     this.fetchRoles();
  }

  /////

    ngOnInit(): void {
    this.store.dispatch(TaxReformActions.loadAllTaxData());
  }

  onSelectCategory(category: string) {
    this.store.dispatch(TaxReformActions.loadByCategory({ category }));
  }

  onSelectRole(role: string) {
    this.store.dispatch(TaxReformActions.loadByRole({ role }));
  }

  onSelectTaxCategory(taxCategory: string) {
    this.store.dispatch(TaxReformActions.loadByTaxCategory({ taxCategory }));
  }


//#region  currency formmeter 

  // Parse number from user input
onIncomeInput(event: Event) {
  const input = event.target as HTMLInputElement; // ✅ Assert correct type
  const raw = input.value.replace(/[₦,]/g, '');
  const numeric = parseFloat(raw);

  if (!isNaN(numeric)) {
    this.titleForm.get('income')?.setValue(numeric);
    this.formattedIncome = input.value;
  } else {
    this.titleForm.get('income')?.setValue(null);
    this.formattedIncome = '';
  }
}


  // Format as ₦1,000,000 on blur
  formatIncome() {
    const value = this.titleForm.get('income')?.value;
    if (typeof value === 'number') {
      this.formattedIncome = this.formatCurrency(value);
    }
  }

  // ₦ formatter
  formatCurrency(value: number): string {
    return `₦${value.toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
//#endregion

  ///

  // extractAllRoles(data: any): string[] {
  //   const roles: string[] = [];

  //   // Extract roles from Individuals
  //   for (let key in data.Individuals) {
  //     if (data.Individuals[key].Roles) {
  //       roles.push(...data.Individuals[key].Roles);
  //     }
  //   }

  //   // Extract roles from Businesses
  //   for (let key in data.Businesses) {
  //     if (data.Businesses[key].Roles) {
  //       roles.push(...data.Businesses[key].Roles);
  //     }
  //   }

  //   // Remove duplicates and return
  //   return [...new Set(roles)];
  // }
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

// calculateByTitle() {
//   const { role, income } = this.titleForm.value;

//   // Flatten all roles from Individuals and Businesses
//   const allRoles: string[] = Object.values(this.taxData.Individuals)
//     .flatMap(c => c.Roles.map(r => typeof r === 'string' ? r : r.title))
//     .concat(
//       Object.values(this.taxData.Businesses)
//         .flatMap(c => c.Roles.map(r => typeof r === 'string' ? r : r.title))
//     );

//   const found = allRoles.find(r => r.toLowerCase() === role.toLowerCase());

//   if (found) {
//     const tax = Number(income) * 0.05; // Apply 5% tax
//     this.taxResult.set(tax);
//   } else {
//     this.taxResult.set(0);
//   }
// }



  // Calculation by Tax Category
  calculateByCategory() {
    const { category, income } = this.categoryForm.value;
    const allCategories = { ...this.taxData.Individuals, ...this.taxData.Businesses };
    const cat = allCategories[category];
    this.taxResult.set(cat?.TaxCategories.includes('PIT') ? Number(income) * 0.05 : 0);
  }

  calculate() {
    switch (this.calculationMode) {
      case 'byTitle': this.onCalculate(); break;
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


//#region Fetch roles 
 fetchRoles() {  
    let user = this
     this.store.dispatch(RolesActions.loadRoles());
     this.store.select(fromRoles.selectAllRoles)
    .subscribe({next(value) {
       // user.Roles =value
        user.Roles = [...value].sort();

    },
    error(err) {
        console.log(err)
    },})
  }

  //#endregion

//#region ole tax plus income 

//   /////role tax plus income 
//  onCalculate() {
//    let user = this
//     const { role, income } = this.titleForm.value;
//     console.log(role)
//     console.log(income)

//     if (role && income > 0) {
//       this.store.dispatch(TaxActions.loadTaxByRole({ role: role, income: income }));
//        this.store.select(TaxSelectors.selectTaxData).subscribe({next(value:any) {
//         console.log(value)
//         if(value.statusCode == 200)
//          user.showTaxResult(value.data);
//         },
//         error(err) {
//             console.log(err)
//         }});
//        this.store.select(TaxSelectors.selectTaxError).subscribe({next(value) {
//         console.log(value)
//         // user.taxResult.set(value);
//         },
//         error(err) {
//             console.log(err)
//         }});
//     }
//   }

  onCalculate() {
     let user = this
     this.store.dispatch(TaxActions.loadTaxByRoleSuccess({tax:null}))
  const { role, income } = this.titleForm.value;

  if (role && income > 0) {
    this.store.dispatch(TaxActions.loadTaxByRole({ role, income }));

    this.store.select(TaxSelectors.selectTaxData)
      .pipe(
        filter((data:any) => !!data && data.statusCode === 200), // Wait for valid API response
        take(1)
      )
      .subscribe((data) => {
        this.showTaxResult(data.data,income);
      });

    this.store.select(TaxSelectors.selectTaxError)
      .pipe(
        filter((error) => !!error),
        take(1)
      )
      .subscribe((error) => {
        console.error('Tax Error:', error);
      });
  }
}



showSuccessModal() {
  this.showModal = true;
}

showTaxResult(result: any, income:number) {
  this.modalType = result.error ? 'error' : 'success';
  this.modalTitle = result.error ? 'Oops!' : 'Tax Result';
  this.modalMessage = result.error
    ? result.error
    : ` Annual Tax for your role "${result.role}" is ₦${result.estimatedTax.toLocaleString()}`;

  // Optionally pass all result details to table
  this.modalData = result.error ? null : {
    Role: result.role,
    Income: income,
    'Annual Tax': `₦${result.estimatedTax.toLocaleString()}`,
    'Tax Categories': result.taxCategories.join(', '),
    Range: result.salaryRange || result.turnoverRange,
    'Monthly Tax': `₦${result.monthlyTax.toLocaleString()}`,
    'Category Type': result.categoryType,
    'Description': result.description,
    'Exempted Tax Categories' : result.exemptedTaxCategories.join(',')
  };

  this.showModal = true;
}

  //#endregion
} 
