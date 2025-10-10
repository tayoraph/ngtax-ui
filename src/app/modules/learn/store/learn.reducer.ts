import { createReducer, on } from '@ngrx/store';
import * as LearnActions from './learn.actions';
import { Learn } from '../learn.model';


export interface LearnState {
  learns: Learn[];
  loading: boolean;
  error: any;
}

export const initialState: LearnState = {
  learns: [],
  loading: false,
  error: null
};

export const learnReducer = createReducer(
  initialState,

  // LOAD
  on(LearnActions.loadLearns, state => ({ ...state, loading: true })),
  on(LearnActions.loadLearnsSuccess, (state, { learns }) => ({ ...state, learns, loading: false })),
  on(LearnActions.loadLearnsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  // ADD
  on(LearnActions.addLearnSuccess, (state, { learn }) => ({ ...state, learns: [...state.learns, learn] })),

  // UPDATE
  on(LearnActions.updateLearnSuccess, (state, { learn }) => ({
    ...state,
    learns: state.learns.map(l => (l._id === learn._id ? learn : l))
  })),

  // DELETE
  on(LearnActions.deleteLearnSuccess, (state, { id }) => ({
    ...state,
    learns: state.learns.filter(l => l._id !== id)
  }))
);
