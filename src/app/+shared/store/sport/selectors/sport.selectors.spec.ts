import {Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
import {Dictionary} from '@ngrx/entity';
// app
import {appReducers, AppState} from '../../app.reducer';
import {getEntities, isLoading, selectIds, selectAll, selectEntities, selectTotal} from './sport.selectors';
import {SportListLoad, SportListLoadComplete} from '../actions/sport.actions';
import {sportList} from '../../../resources/sport.resource';
import {Sport} from '../../../models/sport.model';

describe('SportSelectors', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...appReducers,
        })
      ]
    });

    store = bed.get(Store);
  });

  describe('selectIds', () => {
    it('should return an empty list', () => {
      let result = [];

      store
        .select(selectIds)
        .subscribe(value => (result = value));

      expect(result.length).toBe(0);
    });

    it('should return the list of ids', () => {
      store.dispatch(new SportListLoadComplete({sports: sportList}));

      let result = [];

      store
        .select(selectIds)
        .subscribe(value => (result = value));

      expect(result.length).toBe(sportList.length);
    });
  });

  describe('selectAll', () => {
    it('should return an empty list', () => {
      let result = [];

      store
        .select(selectAll)
        .subscribe(value => (result = value));

      expect(result.length).toBe(0);
    });

    it('should return a list of sports', () => {
      store.dispatch(new SportListLoadComplete({sports: sportList}));

      let result = [];

      store
        .select(selectAll)
        .subscribe(value => (result = value));

      expect(result.length).toBe(sportList.length);
      expect(result).toEqual(sportList);
    });
  });

  describe('selectEntities', () => {
    it('should return an empty Dictionary', () => {
      let result: Dictionary<Sport>;

      store
        .select(selectEntities)
        .subscribe(value => (result = value));

      expect(Object.keys(result).length).toBe(0);
    });

    it('should return a Dictionnary of Sport entity', () => {
      store.dispatch(new SportListLoadComplete({sports: sportList}));

      let result: Dictionary<Sport> = null;

      store
        .select(selectEntities)
        .subscribe(value => (result = value));

      expect(Object.keys(result).length).toBe(sportList.length);
    });
  });

  describe('selectTotal', () => {
    it('should return 0', () => {
      let result = 0;

      store
        .select(selectTotal)
        .subscribe(value => (result = value));

      expect(result).toBe(0);
    });

    it('should return the length of sportList', () => {
      store.dispatch(new SportListLoadComplete({sports: sportList}));

      let result = 0;

      store
        .select(selectTotal)
        .subscribe(value => (result = value));

      expect(result).toBe(sportList.length);
    });
  });

  describe('isLoading', () => {
    it('should return the loading state', () => {
      let result = false;

      store
        .select(isLoading)
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new SportListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new SportListLoadComplete({sports: sportList}));
      expect(result).toBeFalsy();
    });
  });

  describe('getEntities', () => {
    it('should return sport list as entities', () => {
      let result = null;

      store
        .select(getEntities)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new SportListLoadComplete({sports: sportList}));

      expect(Object.keys(result).length).toBe(sportList.length);
    });
  });
});
