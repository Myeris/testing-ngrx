import {Action} from '@ngrx/store';
// app
import {Sport} from '../../../models/sport.model';

export enum SportListActionsTypes {
  LoadSportList = '[Sports page] Load sport list',
  LoadSportListCompleted = '[Sports API] Load sport complete',
  LoadSportListFailed = '[Sports API] Load sport failed'
}

export class SportListLoad implements Action {
  public readonly type = SportListActionsTypes.LoadSportList;
}

export class SportListLoadComplete implements Action {
  public readonly type = SportListActionsTypes.LoadSportListCompleted;

  constructor(public payload: { sports: Sport[] }) {
  }
}

export class SportListLoadFail implements Action {
  public readonly type = SportListActionsTypes.LoadSportListFailed;

  constructor(public payload: { error: string }) {
  }
}

export type SportListActions =
  | SportListLoad
  | SportListLoadComplete
  | SportListLoadFail;
