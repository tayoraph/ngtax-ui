import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaxReformService } from '../tax.service';
import * as TaxReformActions from '../store/actions';

@Injectable()
export class TaxReformEffects {
  constructor(private actions$: Actions, private api: TaxReformService) {}

  // loadAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TaxReformActions.loadAllTaxData),
  //     mergeMap(() =>
  //       this.api.getAll().pipe(
  //         map((data) => {TaxReformActions.loadAllTaxDataSuccess({ data })),
  //         catchError((error) => of(TaxReformActions.loadAllTaxDataFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );

  loadByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxReformActions.loadByCategory),
      mergeMap(({ category }) =>
        this.api.getByCategory(category).pipe(
          map((data) => TaxReformActions.loadByCategorySuccess({ data })),
          catchError((error) => of(TaxReformActions.loadByCategoryFailure({ error: error.message })))
        )
      )
    )
  );

  loadByRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxReformActions.loadByRole),
      mergeMap(({ role }) =>
        this.api.getByRole(role).pipe(
          map((data) => TaxReformActions.loadByRoleSuccess({ data })),
          catchError((error) => of(TaxReformActions.loadByRoleFailure({ error: error.message })))
        )
      )
    )
  );

  loadByTaxCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxReformActions.loadByTaxCategory),
      mergeMap(({ taxCategory }) =>
        this.api.getByTaxCategory(taxCategory).pipe(
          map((data) => TaxReformActions.loadByTaxCategorySuccess({ data })),
          catchError((error) => of(TaxReformActions.loadByTaxCategoryFailure({ error: error.message })))
        )
      )
    )
  );
}
