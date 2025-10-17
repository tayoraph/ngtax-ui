import { createReducer, on } from '@ngrx/store';
import * as TaxcategoriesActions from './tax-category.actions';
import { SubCategoryData } from '../../models/tax-category-model';
import { ApiResponse } from 'src/Utils/interfaces/apiResponse';

export interface TaxcategoryState {
  categories: SubCategoryData[];
  calcuateTaxByRoleIncomeAndcategory: any;
  loading: boolean;
  error: any;
  calcuateTaxByRoleIncomeUsertypeAndcategory: any
  loadTaxByUserType:any
}

export const initialTaxcategoryState: TaxcategoryState = {
  categories: [],
  loading: false,
  error: null,
  calcuateTaxByRoleIncomeAndcategory: null,
  calcuateTaxByRoleIncomeUsertypeAndcategory: undefined,
  loadTaxByUserType:[]
};

// Feature key (used when registering reducer)
export const taxFeatureKey = 'taxCategory'; // this must match the what is in appstate 

export const taxCategoryReducer = createReducer(
  initialTaxcategoryState,
  on(TaxcategoriesActions.loadTaxCategories, (state) => ({ ...state, loading: true })),
 on(TaxcategoriesActions.loadTaxCategoriesSuccess, (state, { categories }) => {
  // console.log('🧾 Categories in Reducer:', categories); // TEMPORARY for debugging
  return {
    ...state,
    loading: false,
    categories,
  };
}),

  on(TaxcategoriesActions.loadTaxCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // on(TaxcategoriesActions.loadTaxByUserType, (state) => ({ ...state,})),
  // on(TaxcategoriesActions.loadTaxByUserTypeSuccess, (state, { categories }) => ({
  //   ...state,
    
  //   categories,
  // })),
  // on(TaxcategoriesActions.loadTaxByUserTypeFailure, (state, { error }) => ({
  //   ...state,
  //   loading: false,
  //   error,
  // })),

  ///////calculate tax by category , role and incomem
  on(TaxcategoriesActions.calculateTaxBycategoryNameRoleAndIncomeAction, (state) => ({ ...state})),
  on(TaxcategoriesActions.calculateTaxBycategoryNameRoleAndIncomeSuccessAction, (state, { calcuateTaxByRoleIncomeAndcategory }) => ({
    ...state,
    calcuateTaxByRoleIncomeAndcategory,
  })),
  on(TaxcategoriesActions.calculateTaxBycategoryNameRoleAndIncomeFailureAction, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),


   ///////calculate tax by category , role and incomme and UserType
  on(TaxcategoriesActions.calculateTaxBycategoryNameRoleuserTypeAndIncomeAction, (state) => ({ ...state})),
  on(TaxcategoriesActions.calculateTaxBycategoryNameRoleuserTypeAndIncomeSuccessAction, (state, { calcuateTaxByRoleIncomeUsertypeAndcategory }) => ({
    ...state,
    calcuateTaxByRoleIncomeUsertypeAndcategory,
  })),
  on(TaxcategoriesActions.calculateTaxBycategoryNameRoleuserTypeAndIncomeFailureAction, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

    ///////get category  tax by  UserType
  on(TaxcategoriesActions.loadTaxByUserType, (state) => ({ ...state})),
  on(TaxcategoriesActions.loadTaxByUserTypeSuccess, (state, { loadTaxByUserType }) => ({
    ...state,
    loadTaxByUserType,
  })),
  on(TaxcategoriesActions.loadTaxByUserTypeFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
