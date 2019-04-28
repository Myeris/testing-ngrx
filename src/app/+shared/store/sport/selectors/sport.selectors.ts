import {createSelector} from '@ngrx/store';
// app
import {AppState} from '../../app.reducer';
import {sportEntityAdapter} from '../sport.state';

export const selectSportList = (state: AppState) => state.sportList;

export const getSportListState = createSelector(
  selectSportList,
  state => state
);

export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal
} = sportEntityAdapter.getSelectors(getSportListState);

export const isLoading = createSelector(
  getSportListState,
  state => state.isLoading
);

export const getEntities = createSelector(
  getSportListState,
  state => state.entities
);

export const getError = createSelector(
  getSportListState,
  state => state.error
);
