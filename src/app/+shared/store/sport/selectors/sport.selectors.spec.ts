import {Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
// app
import {appReducers, AppState} from '../../app.reducer';
import {getEntities, isLoading} from './sport.selectors';
import {SportListLoad, SportListLoadComplete} from '../actions/sport.actions';
import {sportList} from '../../../resources/sport.resource';

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
