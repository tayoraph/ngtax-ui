import { createReducer, on } from '@ngrx/store';
import { showLoader, hideLoader } from './loader.action';
export type LoaderState = boolean;

export const initialState: LoaderState = false;

export const loaderReducer = createReducer(
  initialState,
  on(showLoader, () => true),
  on(hideLoader, () => false)
);
