import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaxActions from './tax-category.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaxReformService } from '../../tax.service';
import { SubCategoryData } from '../../models/tax-category-model';
import { ApiResponse } from 'src/Utils/interfaces/apiResponse';

@Injectable()
export class TaxCategoryEffects {
  constructor(private actions$: Actions, private taxService: TaxReformService) {}

  // Load all categories
  loadTaxCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxActions.loadTaxCategories),
      mergeMap(() =>
        this.taxService.getTaxCategories().pipe(
          map((categories: any) => 
            TaxActions.loadTaxCategoriesSuccess({ categories })
          ),
          catchError((error) => of(TaxActions.loadTaxCategoriesFailure({ error })))
        )
      )
    )
  );

  // Load categories by type (Individuals or Businesses)
  loadTaxByUserType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxActions.loadTaxByUserType),
      mergeMap(({ userType }) =>
        this.taxService.getByCategory(userType).pipe(
          map((response: ApiResponse<SubCategoryData[]>) => 
            TaxActions.loadTaxByUserTypeSuccess({ loadTaxByUserType : response.data })
          ),
          catchError((error) => of(TaxActions.loadTaxByUserTypeFailure({ error })))
        )
      )
    )
  );



    // Calculate tax  by category , role, Income
  CalculateTaxbyCategoryRoleIncome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxActions.calculateTaxBycategoryNameRoleAndIncomeAction),
      mergeMap(({calculateReq}) =>
        this.taxService.calculateTaxbyCategoryRoleIncome(calculateReq).pipe(
          map((calcuateTaxByRoleIncomeAndcategory: any) => 
            TaxActions.calculateTaxBycategoryNameRoleAndIncomeSuccessAction({ calcuateTaxByRoleIncomeAndcategory })
          ),
          catchError((error) => of(TaxActions.calculateTaxBycategoryNameRoleAndIncomeFailureAction({ error })))
        )
      )
    )
  );


   //alculate tax by category , role and incomme and UserType
  calculateTaxBycategoryNameRoleuserType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxActions.calculateTaxBycategoryNameRoleuserTypeAndIncomeAction),
      mergeMap(({calculateReq}) =>
        this.taxService.calculateTaxBycategoryNameRoleuserType(calculateReq).pipe(
          map((calcuateTaxByRoleIncomeUsertypeAndcategory: any) => 
            TaxActions.calculateTaxBycategoryNameRoleuserTypeAndIncomeSuccessAction({ calcuateTaxByRoleIncomeUsertypeAndcategory })
          ),
          catchError((error) => of(TaxActions.calculateTaxBycategoryNameRoleuserTypeAndIncomeFailureAction({ error })))
        )
      )
    )
  );
}
