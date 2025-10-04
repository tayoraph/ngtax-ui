import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, AuthActions.signup, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, AuthActions.signupSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(AuthActions.loginFailure, AuthActions.signupFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.logout, state => ({ ...state, user: null }))
);
