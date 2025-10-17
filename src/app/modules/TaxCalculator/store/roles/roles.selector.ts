import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RolesState } from './roles.reducer';

export const selectRolesState = createFeatureSelector<RolesState>('roles');

export const selectAllRoles = createSelector(
  selectRolesState,
  state => state.roles
);
export const rolesbyCategoryAndUserTypeSelector = createSelector(
  selectRolesState,
   (state) => {
    // console.log('📦 Selector data:', state); // 👈 log here
    return state.rolesbyCategoryAndUserType;
  }
 // state => state.rolesbyCategoryAndUserType
);

export const rolesByCategory = createSelector(
  selectRolesState,
  state => state.rolesbyCategory
);




