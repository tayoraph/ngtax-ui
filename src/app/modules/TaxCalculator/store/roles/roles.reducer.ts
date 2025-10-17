import { createReducer, on } from '@ngrx/store';
import * as RolesActions from './roles.actions';
import { Role } from '../../tax.model';

export interface RolesState {
  roles: Role[];
  rolesbyCategory: Role[];
  rolesbyCategoryAndUserType: Role[];
  error: any;
}

export const initialState: RolesState = {
  roles: [],
  rolesbyCategory: [],
  rolesbyCategoryAndUserType:[],
  error: null
};

export const rolesReducer = createReducer(
  initialState,
  on(RolesActions.loadRoles, state => ({ ...state, loading: true })),
  on(RolesActions.loadRolesSuccess, (state, { roles }) => ({
    ...state,
    roles,
  })),
  on(RolesActions.loadRolesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  /// load to roles by category,
  on(RolesActions.loadRoleByCategory, state => ({ ...state, loading: true })),
  on(RolesActions.loadRoleByCategorySuccess, (state, { rolesbyCategory }) => ({
    ...state,
    rolesbyCategory,
  })),
  on(RolesActions.loadRoleByCategoryFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  /// load to roles by category,
  on(RolesActions.loadRoleByCategoryAndUserType, state => ({ ...state, loading: true })),
  on(RolesActions.loadRoleByCategoryAndUserTypeSuccess, (state, { rolesbyCategoryAndUserType }) => {
      // console.log('✅ Reducer received data:', rolesbyCategoryandUserType); 
  return{  ...state,
    rolesbyCategoryAndUserType,
  }
  }),
  on(RolesActions.loadRoleByCategoryAndUserTypeFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
