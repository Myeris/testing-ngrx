import {initialSportState, sportEntityAdapter, SportState} from '../sport.state';
import {SportListActions, SportListActionsTypes} from '../actions/sport.actions';

export function sportReducer(
  state: SportState = initialSportState,
  action: SportListActions
): SportState {
  switch (action.type) {
    case SportListActionsTypes.LoadSportList:
      return {...state, selectedId: null, isLoading: true, error: null};
    case SportListActionsTypes.LoadSportListFailed:
      return {...state, selectedId: null, isLoading: false, error: action.payload.error};
    case SportListActionsTypes.LoadSportListCompleted:
      return sportEntityAdapter.addAll(action.payload.sports, {
          ...state,
          selectedId: null,
          isLoading: false,
          error: null
        }
      );
    default:
      return state;
  }
}
