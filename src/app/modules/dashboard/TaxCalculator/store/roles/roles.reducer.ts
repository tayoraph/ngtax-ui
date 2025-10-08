import { createReducer, on } from '@ngrx/store';
import * as RolesActions from './roles.actions';
import { Role } from '../../tax.model';

export interface RolesState {
  roles: Role[];
  loading: boolean;
  error: any;
}

export const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null
};

export const rolesReducer = createReducer(
  initialState,
  on(RolesActions.loadRoles, state => ({ ...state, loading: true })),
  on(RolesActions.loadRolesSuccess, (state, { roles }) => ({
    ...state,
    roles,
    loading: false
  })),
  on(RolesActions.loadRolesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
