import {SportListActionsTypes, SportListLoad, SportListLoadComplete, SportListLoadFail} from './sport.actions';
import {sportList} from '../../../resources/sport.resource';

describe('SportActions', () => {
  describe('SportListLoad', () => {
    it('should create an action', () => {
      const action = new SportListLoad();
      expect(action.type).toBe(SportListActionsTypes.LoadSportList);
    });
  });

  describe('SportListLoadComplete', () => {
    it('should create an action', () => {
      const action = new SportListLoadComplete({sports: sportList});
      expect(action.type).toBe(SportListActionsTypes.LoadSportListCompleted);
    });
  });

  describe('SportListLoadFail', () => {
    it('should create an action', () => {
      const action = new SportListLoadFail({error: 'Something wrong happened.'});
      expect(action.type).toBe(SportListActionsTypes.LoadSportListFailed);
    });
  });
});
