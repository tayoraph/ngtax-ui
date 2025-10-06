import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaxReformActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaxReformService } from '../tax.service';

@Injectable()
export class TaxReformEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxReformActions.loadTaxReform),
      mergeMap(() =>
        this.taxReformService.getAll().pipe(
          map((data:any) => TaxReformActions.loadTaxReformSuccess({ data })),
          catchError(error => of(TaxReformActions.loadTaxReformFailure({ error })))
        )
      )
    )
  );

  loadByRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxReformActions.loadByRole),
      mergeMap(({ role }) =>
        this.taxReformService.getByRole(role).pipe(
          map(data => TaxReformActions.loadByRoleSuccess({ data })),
          catchError(error => of(TaxReformActions.loadByRoleFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taxReformService: TaxReformService
  ) {}
}
