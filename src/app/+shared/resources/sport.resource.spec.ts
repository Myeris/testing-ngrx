import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
// app
import {SportResource} from './sport.resource';

describe('SportResource', () => {
  let resource: SportResource;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [SportResource]
    });

    resource = bed.get(SportResource);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });

  describe('getSportList$', () => {
    it('should return an Observable of Sport[]', () => {
      const spy = spyOn(resource, 'getSportList$').and.callThrough();
      const res = resource.getSportList$();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(res instanceof Observable).toBeTruthy();
    });
  });
});
