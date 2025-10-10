import { ActionReducerMap } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

//  Import feature reducers and states
import { AuthState, authReducer } from 'src/app/modules/auth/store/auth.reducer';

import { AuthEffects } from 'src/app/modules/auth/store/auth.effects';
import { isDevMode } from '@angular/core';
import { TaxState, taxReducer } from 'src/app/modules/TaxCalculator/store/role-tax/role-tax.reducer';
import { TaxEffects } from 'src/app/modules/TaxCalculator/store/role-tax/role.tax-effects';
import { RolesEffects } from 'src/app/modules/TaxCalculator/store/roles/roles.effects';
import { RolesState, rolesReducer } from 'src/app/modules/TaxCalculator/store/roles/roles.reducer';
import { learnReducer, LearnState } from 'src/app/modules/learn/store/learn.reducer';
import { LearnEffects } from 'src/app/modules/learn/store/learn.effect';
import { loaderReducer, LoaderState } from 'src/app/core/loader/store/loader.reducer';

// Define the root state interface
export interface AppState {
  auth: AuthState;
  roles: RolesState;
 tax: TaxState;
 learn: LearnState;
loader: LoaderState;
}
//  Define the ActionReducerMap
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  roles: rolesReducer,
  tax: taxReducer,
  learn : learnReducer,
  loader: loaderReducer
  
};

// Register Store + Effects as providers
export const appStoreProviders = [
  provideStore(reducers),
  provideEffects([AuthEffects, RolesEffects, TaxEffects, LearnEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
];
