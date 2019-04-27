import {SportState} from './sport/sport.state';
import {ActionReducerMap} from '@ngrx/store';
// app
import {sportReducer} from './sport/reducers/sport.reducer';

export interface AppState {
  sportList: SportState;
}

export const appReducers: ActionReducerMap<AppState> = {
  sportList: sportReducer
};
