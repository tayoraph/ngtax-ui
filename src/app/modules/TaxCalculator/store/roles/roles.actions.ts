import { createAction, props } from '@ngrx/store';
import { Role } from '../../tax.model';

export const loadRoles = createAction('[Roles] Load Roles');
export const loadRolesSuccess = createAction(
  '[Roles] Load Roles Success',
  props<{ roles: Role[] }>()
);
export const loadRolesFailure = createAction(
  '[Roles] Load Roles Failure',
  props<{ error: any }>()
);



// fetch role by category and user type
export const loadRoleByCategory = createAction('[Roles] Load Roles by category ', props<{ category: string }>());
export const loadRoleByCategorySuccess = createAction(
  '[Roles] Load Roles by category Success',
  props<{ rolesbyCategory: Role[] }>()
);
export const loadRoleByCategoryFailure = createAction(
  '[Roles] Load Roles by category Failure',
  props<{ error: any }>()
);


// fetch role by category and user type
export const loadRoleByCategoryAndUserType = createAction('[Roles] Load Roles by category and user type', props<{ category: string,  userType:string }>());
export const loadRoleByCategoryAndUserTypeSuccess = createAction(
  '[Roles]Load Roles by category and user type Success',
  props<{ rolesbyCategoryAndUserType: Role[] }>()
);
export const loadRoleByCategoryAndUserTypeFailure = createAction(
  '[Roles] Load Roles by category and user type Failure',
  props<{ error: any }>()
);

