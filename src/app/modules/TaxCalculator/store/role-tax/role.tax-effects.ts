// src/app/store/tax.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as TaxActions from './role.tax.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaxReformService } from '../../tax.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TaxEffects {
  constructor(private actions$: Actions, private taxReformService: TaxReformService, private toastr: ToastrService,) {}

  loadTax$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxActions.loadTaxByRole),
      switchMap(({ role, income }) =>
        this.taxReformService.getTaxByRoleAndIncome(role, income).pipe(
          map((tax:any) => TaxActions.loadTaxByRoleSuccess({ tax })),
          catchError(error => of(TaxActions.loadTaxByRoleFailure({ error })))
        )
      )
    )
  );

  // // Show success toast on success
  //   showSuccess$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(TaxActions.loadTaxByRoleSuccess),
  //       tap(() => {
  //         this.toastr.success('Request successfully', 'Success');
  //       })
  //     ),
  //     { dispatch: false }
  //   );
  
    // Show error toast on failure
    showError$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaxActions.loadTaxByRoleFailure),
        tap(({ error }) => {
          this.toastr.error(error?.error.message || 'Request Failed', 'Error');
        })
      ),
      { dispatch: false }
    );
}
