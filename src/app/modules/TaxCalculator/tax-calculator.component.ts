import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TaxData, EntityType, Role } from './tax.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { TaxReformService } from './tax.service';
import { Store } from '@ngrx/store';
import * as TaxReformActions from './store/actions';
import {   selectAllTaxData,  selectCategoryData,  selectRoleData,  selectTaxCategoryData,  selectLoading} from './store/selectors';
import * as RolesActions from './store/roles/roles.actions';
import * as fromRoles from './store/roles/roles.selector';
import { debounceTime, filter, Observable, take } from 'rxjs';


import * as TaxSelectors from './store/role-tax/role.tax-selector';
import * as TaxActions from './store/role-tax/role.tax.action';
import { SuccessModalComponent } from 'src/Utils/modals/successModal/success-modal.component';

import * as TaxCategoriesActions from './store/tax-categories/tax-category.actions';
import {  calculateTaxBycategoryNameRoleAndIncomeSelector, calculateTaxBycategoryNameRoleUsertypeAndIncomeSelector, loadTaxByUserTypeSelector, selectTaxCategories } from './store/tax-categories/tax-category.selector';
import { taxCalculationBytaxcategoryRoleandIncome } from './models/tax-category-model';
import { FormValidation } from 'src/Utils/formsValidations/formValidation';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule,SuccessModalComponent, HttpClientModule],
  templateUrl: './tax-calculator.component.html',
})
export class TaxCalculatorComponent implements OnInit{
  taxFormByEntity: FormGroup;
  titleForm: FormGroup;
  categoryForm: FormGroup;
  calculationMode: 'byTitle' | 'byCategory' | 'byEntity' = 'byEntity';
  Roles: Role[] = [];
  RolesByCategory: Role[] | any= [];
  RolesByCategoryAndUserType: Role[] | any = [];

  errorMessage = signal<string | null>(null);
  /////
  // allData$ = this.store.select(selectAllTaxData);
  // categoryData$ = this.store.select(selectCategoryData);
  // roleData$ = this.store.select(selectRoleData);
  // taxCategoryData$ = this.store.select(selectTaxCategoryData);
  // loading$ = this.store.select(selectLoading);
  
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

  /// taxcategory start here 
  categories: any
  categoriesByUserType:any
  // categories$ = this.store.select(TaxCategorySelectors.selectAllCategories);

 private taxService = inject(TaxReformService);

  constructor(private fb: FormBuilder, private store: Store, public formValidation: FormValidation) {
    // Entity-based form
    this.taxFormByEntity = this.formValidation.taxFormByEntity();
    // By role form
    this.titleForm = this.formValidation.titleForm();

     // By category form
    this.categoryForm = this.formValidation.categoryForm();

    this.fetchRoles();

    this.store.dispatch(TaxCategoriesActions.loadTaxCategories());
  }

  /////

  ngOnInit(): void {
    this.store.dispatch(TaxReformActions.loadAllTaxData());
     this.fetchTaxCatgeories()


     //when the caategory changes 
     this.categoryForm.get('category')!.valueChanges
    .pipe(debounceTime(200))
    .subscribe(category => {
       this.fetchRolesByCategory(category);
    });

      //when the caategory changes 
     this.taxFormByEntity.get('userType')!.valueChanges
    .pipe(debounceTime(200))
    .subscribe(category => {
       this.fetchCategoryByUserType(category);
    });

    // when category and  usertype changes
    this.taxFormByEntity.get('category')!
    .valueChanges
    .pipe(debounceTime(200))
    .subscribe(category => {
       this.fetchRolesByCategoryAndUserType(this.taxFormByEntity.get('userType')?.value, this.taxFormByEntity.get('category')?.value);
    });
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


//#region Fetch roles by category 
 fetchRolesByCategoryAndUserType(category:string, userType:string) {  
    let user = this
     this.store.dispatch(RolesActions.loadRoleByCategoryAndUserType({category:category, userType: userType}));
     this.store.select(fromRoles.rolesbyCategoryAndUserTypeSelector)
    .subscribe({next(value) {
        user.RolesByCategoryAndUserType = [...value].sort();

    },
    error(err) {
        console.log(err)
    },})
    
  }



  fetchRolesByCategory(category:string) {
     let user = this
     this.store.dispatch(RolesActions.loadRoleByCategory({category:category}));
     this.store.select(fromRoles.rolesByCategory)
    .subscribe({next(value) {
      //  console.log(value)
        user.RolesByCategory = [...value].sort();

    },
    error(err) {
        console.log(err)
    },})
  }


  //fetching categories by user type
    fetchCategoryByUserType(userType:string) {
     let user = this
     this.store.dispatch(TaxCategoriesActions.loadTaxByUserType({userType:userType}));
     this.store.select(loadTaxByUserTypeSelector)
    .subscribe({next(value) {
        user.categoriesByUserType = value

    },
    error(err) {
        console.log(err)
    },})
  }


  //#endregion 

//#region ole tax plus income 


  onCalculate() {
     let user = this
     this.store.dispatch(TaxActions.loadTaxByRoleSuccess({tax:null}))
  const { role, income } = this.titleForm.value;

  if (role && income > 0) {
    this.store.dispatch(TaxActions.loadTaxByRole({ role, income }));

    this.store.select(TaxSelectors.selectTaxData)
      .pipe(
        filter((data:any) => !!data && data.statusCode === 200), // Wait for valid API response
       // take(1)
      )
      .subscribe((data) => {
        this.showTaxResult(data.data,income);
      });

    this.store.select(TaxSelectors.selectTaxError)
      .pipe(
        filter((error) => !!error),
        //take(1)
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



  //#region Calculate by Tax category 

  fetchTaxCatgeories(){
    let user = this;
      ///use selctor to getcategories 
      this.store.select(selectTaxCategories).
      subscribe({next(value:any) {
          user.categories =value?.data
      },
      error(err) {
          console.log(err)
      },})
  }


  calculateTaxBycategoryNameRoleAndIncome(){
    let value : taxCalculationBytaxcategoryRoleandIncome = {
      role: this.categoryForm.get('role')?.value,
      taxName: this.categoryForm.get('category')?.value,
      incomeOrTurnover: Number(this.categoryForm.get('income')?.value)
    }

    this.store.dispatch(TaxCategoriesActions.calculateTaxBycategoryNameRoleAndIncomeAction({calculateReq:value}))
    this.store.select(calculateTaxBycategoryNameRoleAndIncomeSelector)
          .pipe(
            filter((data:any) => !!data && data.statusCode === 200), // Wait for valid API response
           // take(1)
          )
          .subscribe((data) => {
            this.showTaxByCategoryResult(data.data,value.incomeOrTurnover);
     });
  }


  showTaxByCategoryResult(result: any, income:number) {
    this.modalType = result.error ? 'error' : 'success';
    this.modalTitle = result.error ? 'Oops!' : 'Tax Result';
    this.modalMessage = result.error
      ? result.error
      : `  Tax details for Annual Income Or Turnover of ${result['Annual Income Or Turnover']} and  category "${result['Tax Category']}"`;
    // Optionally pass all result details to table
    this.modalData = result.error ? null : result
    this.showModal = true;
  }
  //#endregion



//#region calculate tax by Role Entity , category and income 
  calculateTaxBycategoryNameRoleEntityAndIncome(){
    let value : taxCalculationBytaxcategoryRoleandIncome = {
      role: this.taxFormByEntity.get('role')?.value,
      taxName: this.taxFormByEntity.get('category')?.value,
      incomeOrTurnover: Number(this.taxFormByEntity.get('income')?.value),
      userType: this.taxFormByEntity.get('userType')?.value,

    }
    this.store.dispatch(TaxCategoriesActions.calculateTaxBycategoryNameRoleuserTypeAndIncomeAction({calculateReq:value}))
    this.store.select(calculateTaxBycategoryNameRoleUsertypeAndIncomeSelector)
          .pipe(
            filter((data:any) => !!data && data.statusCode === 200), // Wait for valid API response
            //take(1)
          )
          .subscribe((data) => {
            this.showTaxByCategoryResult(data.data,value.incomeOrTurnover);
     },error=>{
      console.log(error)
     })
    
  }

//#endregion

} 
