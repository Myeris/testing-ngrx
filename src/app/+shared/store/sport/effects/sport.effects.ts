import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
// app
import {AppState} from '../../app.reducer';
import {SportListActionsTypes, SportListLoad, SportListLoadComplete, SportListLoadFail} from '../actions/sport.actions';
import {SportResource} from '../../../resources/sport.resource';
import {Sport} from '../../../models/sport.model';

@Injectable()
export class SportEffects {
  @Effect()
  loadSportList$: Observable<Action> = this.actions$
    .pipe(
      ofType<SportListLoad>(SportListActionsTypes.LoadSportList),
      switchMap(() => this.sportResource.getSportList$()),
      map((sports: Sport[]) => new SportListLoadComplete({sports})),
      catchError((error: string) => of(new SportListLoadFail({error})))
    );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private sportResource: SportResource) {
  }
}
