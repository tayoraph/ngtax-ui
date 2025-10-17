import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubCategoryData } from '../../models/tax-category-model';
import { TaxcategoryState, taxFeatureKey } from './tax-category.reducer';


// Base feature selector
export const selectTaxCategoryState = createFeatureSelector<TaxcategoryState>(taxFeatureKey);

// Select all tax categories
export const selectTaxCategories = createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => {
    return state.categories;
  }
);

// calculate Tax By category Name Role And Income Selector
export const  calculateTaxBycategoryNameRoleAndIncomeSelector= createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => {
    return state.calcuateTaxByRoleIncomeAndcategory;
  }
);

// calculate Tax By category Name Role Usertype And Income Selector
export const  calculateTaxBycategoryNameRoleUsertypeAndIncomeSelector= createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => {
    return state.calcuateTaxByRoleIncomeUsertypeAndcategory;
  }
);





// Select categories by subcategory name
export const loadTaxByUserTypeSelector = 
  createSelector(selectTaxCategoryState, (state: TaxcategoryState) => {
    return state.loadTaxByUserType;
  }
  );
