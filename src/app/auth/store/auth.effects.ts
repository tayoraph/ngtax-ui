import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(action => this.auth.login(action.email, action.password).pipe(
      map(user => AuthActions.loginSuccess({ user })),
      catchError(err => of(AuthActions.loginFailure({ error: err })))
    ))
  ));

  signup$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signup),
    switchMap(action => this.auth.signup(action.email, action.password).pipe(
      map(user => AuthActions.signupSuccess({ user })),
      catchError(err => of(AuthActions.signupFailure({ error: err })))
    ))
  ));
}
