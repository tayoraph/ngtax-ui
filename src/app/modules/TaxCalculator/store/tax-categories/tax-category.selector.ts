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

// Select all tax categories
export const  calculateTaxBycategoryNameRoleAndIncomeSelector= createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => {
    return state.calcuateTaxByRoleIncomeAndcategory;
  }
);

// Select all tax categories
export const  calculateTaxBycategoryNameRoleUsertypeAndIncomeSelector= createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => {
    return state.calcuateTaxByRoleIncomeUsertypeAndcategory;
  }
);


// Select loading state
export const selectTaxLoading = createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => state.loading
);

// Select error
export const selectTaxError = createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => state.error
);



// Select categories by subcategory name
// export const selectCategoryByName = (subCategoryName: string) =>
//   createSelector(selectAllCategories, (categories: SubCategoryData[]) =>
//     categories.find(cat => cat.name === subCategoryName)
//   );
