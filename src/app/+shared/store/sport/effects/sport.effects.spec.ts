import { async, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
// app
import { appReducers } from '../../app.reducer';
import { SportEffects } from './sport.effects';
import { getActions, TestActions } from '../../../utils/test-actions.utils';
import { SportListLoad, SportListLoadComplete, SportListLoadFail } from '../actions/sport.actions';
import { sportList, SportResource } from '../../../resources/sport.resource';

describe('SportEffects', () => {
  let actions$: TestActions;
  let sportResource: SportResource;
  let effects: SportEffects;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers)],
      providers: [SportEffects, SportResource, { provide: Actions, useFactory: getActions }]
    });

    actions$ = bed.get(Actions);
    sportResource = bed.get(SportResource);
    effects = bed.get(SportEffects);
  });

  describe('loadSportList$', () => {
    it('should return a SportListLoadComplete action with a list of sports on success', async(() => {
      spyOn(sportResource, 'getSportList$').and.returnValue(of(sportList));

      const action = new SportListLoad();
      const completion = new SportListLoadComplete({ sports: sportList });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadSportList$).toBeObservable(expected);
    }));

    it('should return a SportListLoadFail action with a string on error', async(() => {
      const action = new SportListLoad();
      const payload = 'this is an error';
      const completion = new SportListLoadFail({ error: payload });

      spyOn(sportResource, 'getSportList$').and.callFake(() => throwError(payload));

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.loadSportList$).toBeObservable(expected);
    }));
  });
});
