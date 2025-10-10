import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LearnActions from './learn.actions';
import { LearnService } from '../learn.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LearnEffects {
      constructor(private actions$: Actions, private learnService: LearnService) {}



  loadLearns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.loadLearns),
      mergeMap(() =>
        this.learnService.getLearns().pipe(
          // tap(res => console.log('Response from API:', res)),
          map((learns:any) => LearnActions.loadLearnsSuccess({ learns  : learns.data })),
          catchError(error => of(LearnActions.loadLearnsFailure({ error })))
        )
      )
    )
  );



  // ADD
  addLearn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.addLearn),
      mergeMap(action =>
        this.learnService.addLearn(action.learn).pipe(
          map(learn => LearnActions.addLearnSuccess({ learn })),
          catchError(error => of(LearnActions.addLearnFailure({ error })))
        )
      )
    )
  );

  // UPDATE
  updateLearn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.updateLearn),
      mergeMap(action =>
        this.learnService.updateLearn(action.id, action.learn).pipe(
          map(learn => LearnActions.updateLearnSuccess({ learn })),
          catchError(error => of(LearnActions.updateLearnFailure({ error })))
        )
      )
    )
  );

  // DELETE
  deleteLearn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.deleteLearn),
      mergeMap(action =>
        this.learnService.deleteLearn(action.id).pipe(
          map(() => LearnActions.deleteLearnSuccess({ id: action.id })),
          catchError(error => of(LearnActions.deleteLearnFailure({ error })))
        )
      )
    )
  );
}
