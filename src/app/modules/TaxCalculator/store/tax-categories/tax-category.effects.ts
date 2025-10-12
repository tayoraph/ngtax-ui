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
  loadTaxByType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxActions.loadTaxByType),
      mergeMap(({ categoryType }) =>
        this.taxService.getByCategory(categoryType).pipe(
          map((categories: SubCategoryData[]) => 
            TaxActions.loadTaxByTypeSuccess({ categories })
          ),
          catchError((error) => of(TaxActions.loadTaxByTypeFailure({ error })))
        )
      )
    )
  );
}
