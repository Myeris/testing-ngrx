import {initialSportState} from '../sport.state';
import {sportReducer} from './sport.reducer';
import {SportListLoad, SportListLoadComplete, SportListLoadFail} from '../actions/sport.actions';
import {sportList} from '../../../resources/sport.resource';

describe('sportReducer', () => {
  describe('undefined actions', () => {
    it('should return the default state of the app', () => {
      const initialState = initialSportState;
      const action = {};
      // @ts-ignore because I'm trying to fool the reducer by passing non sense but TS keeps crying
      const state = sportReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LoadSportList', () => {
    it('should set isLoading to true', () => {
      const action = new SportListLoad();
      const state = sportReducer(initialSportState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.selectedId).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe('LoadSportListFailed', () => {
    it('should set isLoading to false and selectedId to null', () => {
      const error = 'error message';
      const action = new SportListLoadFail({error});
      const state = sportReducer({...initialSportState, isLoading: true}, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.error).toBe(error);
    });
  });

  describe('LoadSportListCompleted', () => {
    it('should set the sport entities', () => {
      const action = new SportListLoadComplete({sports: sportList});
      const state = sportReducer(initialSportState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.error).toBeNull();
      expect(state.ids.length).toBe(sportList.length);
    });
  });
});
