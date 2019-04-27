import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
// app
import {Sport} from '../models/sport.model';

export const sportList: Sport[] = [
  {id: 0, name: 'Jump rope'},
  {id: 1, name: 'Basket ball'},
  {id: 2, name: 'Football'},
  {id: 3, name: 'Baseball'},
  {id: 4, name: 'Running'},
  {id: 5, name: 'Yoga'},
  {id: 6, name: 'Weight lifting'},
];

@Injectable({
  providedIn: 'root'
})
export class SportResource {

  constructor() {
  }

  public getSportList$(): Observable<Sport[]> {
    return of(sportList);
  }
}
