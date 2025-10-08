import { ActionReducerMap } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

//  Import feature reducers and states
import { AuthState, authReducer } from 'src/app/modules/auth/store/auth.reducer';

import { AuthEffects } from 'src/app/modules/auth/store/auth.effects';
import { RolesEffects } from 'src/app/modules/dashboard/TaxCalculator/store/roles/roles.effects';
import { RolesState, rolesReducer } from 'src/app/modules/dashboard/TaxCalculator/store/roles/roles.reducer';
import { isDevMode } from '@angular/core';
import { taxReducer, TaxState } from 'src/app/modules/dashboard/TaxCalculator/store/role-tax/role-tax.reducer';
import { TaxEffects } from 'src/app/modules/dashboard/TaxCalculator/store/role-tax/role.tax-effects';

// Define the root state interface
export interface AppState {
  auth: AuthState;
  roles: RolesState;
   tax: TaxState;
}
//  Define the ActionReducerMap
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  roles: rolesReducer,
    tax: taxReducer,
};

// Register Store + Effects as providers
export const appStoreProviders = [
  provideStore(reducers),
  provideEffects([AuthEffects, RolesEffects, TaxEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
];
