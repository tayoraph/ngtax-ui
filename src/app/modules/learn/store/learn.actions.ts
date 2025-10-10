import { createAction, props } from '@ngrx/store';
import { Learn } from '../learn.model';

// LOAD
export const loadLearns = createAction('[Learn] Load Learns');
export const loadLearnsSuccess = createAction('[Learn] Load Learns Success', props<{ learns: Learn[] }>());
export const loadLearnsFailure = createAction('[Learn] Load Learns Failure', props<{ error: any }>());

// CREATE
export const addLearn = createAction('[Learn] Add Learn', props<{ learn: Learn }>());
export const addLearnSuccess = createAction('[Learn] Add Learn Success', props<{ learn: Learn }>());
export const addLearnFailure = createAction('[Learn] Add Learn Failure', props<{ error: any }>());

// UPDATE
export const updateLearn = createAction('[Learn] Update Learn', props<{ id: string; learn: Partial<Learn> }>());
export const updateLearnSuccess = createAction('[Learn] Update Learn Success', props<{ learn: Learn }>());
export const updateLearnFailure = createAction('[Learn] Update Learn Failure', props<{ error: any }>());

// DELETE
export const deleteLearn = createAction('[Learn] Delete Learn', props<{ id: string }>());
export const deleteLearnSuccess = createAction('[Learn] Delete Learn Success', props<{ id: string }>());
export const deleteLearnFailure = createAction('[Learn] Delete Learn Failure', props<{ error: any }>());
