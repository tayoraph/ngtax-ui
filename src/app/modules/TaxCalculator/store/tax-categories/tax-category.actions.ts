import { createAction, props } from '@ngrx/store';
import { SubCategoryData, taxCalculationBytaxcategoryRoleandIncome } from '../../models/tax-category-model';
import { ApiResponse } from 'src/Utils/interfaces/apiResponse';

// Load all categories
export const loadTaxCategories = createAction('[Tax] Load Tax Categories');
export const loadTaxCategoriesSuccess = createAction(
  '[Tax] Load Tax Categories Success',
  props<{ categories: SubCategoryData[] }>()
);
export const loadTaxCategoriesFailure = createAction(
  '[Tax] Load Tax Categories Failure',
  props<{ error: any }>()
);

// Load by category type
export const loadTaxByUserType = createAction(
  '[Tax] Load Tax By Type',
  props<{ userType: string }>()
);


export const loadTaxByUserTypeSuccess = createAction(
  '[Tax] Load Tax By Type Success',
  props<{ loadTaxByUserType: SubCategoryData[] }>()
);
export const loadTaxByUserTypeFailure = createAction(
  '[Tax] Load Tax By Type Failure',
  props<{ error: any }>()
);



///////calculate tax by category , role and incomem

export const calculateTaxBycategoryNameRoleAndIncomeAction = createAction(
  '[Tax] calculate Tax By category Name Role And Income',
  props<{ calculateReq: taxCalculationBytaxcategoryRoleandIncome }>()
);


export const calculateTaxBycategoryNameRoleAndIncomeSuccessAction = createAction(
  '[Tax] calculate Tax By category Name Role And Income Success',
  props<{ calcuateTaxByRoleIncomeAndcategory: ApiResponse }>()
);
export const calculateTaxBycategoryNameRoleAndIncomeFailureAction = createAction(
  '[Tax] calculate Tax By category Name Role And Income Failure',
  props<{ error: any }>()
);



///////calculate tax by category , role and incomme and UserType

export const calculateTaxBycategoryNameRoleuserTypeAndIncomeAction = createAction(
  '[Tax] calculate Tax By category Name Role user type And Income',
  props<{ calculateReq: taxCalculationBytaxcategoryRoleandIncome }>()
);


export const calculateTaxBycategoryNameRoleuserTypeAndIncomeSuccessAction = createAction(
  '[Tax] calculate Tax By category Name Role user type And Income Success',
  props<{ calcuateTaxByRoleIncomeUsertypeAndcategory: ApiResponse }>()
);
export const calculateTaxBycategoryNameRoleuserTypeAndIncomeFailureAction = createAction(
  '[Tax] calculate Tax By category Name Role user tpe And Income Failure',
  props<{ error: any }>()
);

