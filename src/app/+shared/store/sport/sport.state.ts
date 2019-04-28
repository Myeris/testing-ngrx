import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
// app
import {Sport} from '../../models/sport.model';

export interface SportState extends EntityState<Sport> {
  selectedId: number;
  isLoading: boolean;
  error: string;
}

export const sportEntityAdapter: EntityAdapter<Sport> = createEntityAdapter<Sport>({
  selectId: (sport: Sport) => sport.id
});

export const initialSportState: SportState = sportEntityAdapter.getInitialState({
  selectedId: null,
  isLoading: false,
  error: null
});
