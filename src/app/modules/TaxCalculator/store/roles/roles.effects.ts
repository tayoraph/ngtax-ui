import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RolesActions from './roles.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { TaxReformService } from '../../tax.service';
import { ApiResponse } from 'src/Utils/interfaces/apiResponse';
import { Role } from '../../tax.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RolesEffects {
  constructor(private actions$: Actions, private taxReformService: TaxReformService, private toastr: ToastrService,) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.loadRoles),
      mergeMap(() =>
        this.taxReformService.getRoles().pipe(
          map((response:ApiResponse<Role[]>) => RolesActions.loadRolesSuccess({ 
            roles: response.data
           })),
          catchError(error => of(RolesActions.loadRolesFailure({ error })))
        )
      )
    )
  );

  // Show error toast on failure
  showError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.loadRolesFailure),
      tap(({ error }) => {
          this.toastr.error(error?.error.message || 'Failed to load roles', 'Error');
      })
    ),
    { dispatch: false }
  );
}
