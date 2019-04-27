import {TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {cold, hot} from 'jasmine-marbles';
// app
import {appReducers} from '../../app.reducer';
import {SportEffects} from './sport.effects';
import {getActions, TestActions} from '../../../utils/test-actions.utils';
import {SportListLoad, SportListLoadComplete} from '../actions/sport.actions';
import {sportList, SportResource} from '../../../resources/sport.resource';

describe('SportEffects', () => {
  let actions$: TestActions;
  let sportResource: SportResource;
  let effects: SportEffects;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers)],
      providers: [
        SportEffects,
        SportResource,
        {provide: Actions, useFactory: getActions}
      ]
    });

    actions$ = bed.get(Actions);
    sportResource = bed.get(SportResource);
    effects = bed.get(SportEffects);

    spyOn(sportResource, 'getSportList$').and.returnValue(of(sportList));
  });

  describe('loadSportList$', () => {
    it('should return a list of sports', () => {
      const action = new SportListLoad();
      const completion = new SportListLoadComplete({sports: sportList});

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      expect(effects.loadSportList$).toBeObservable(expected);
    });
  });
});
