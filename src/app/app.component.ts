import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
// app
import {AppState} from './+shared/store/app.reducer';
import {Sport} from './+shared/models/sport.model';
import {LifecycleComponent} from './+shared/components/lifecycle/lifecycle.component';
import {selectAll} from './+shared/store/sport/selectors/sport.selectors';
import {SportListLoad} from './+shared/store/sport/actions/sport.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends LifecycleComponent implements OnInit, OnDestroy {
  public sportList$: Observable<Sport[]>;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.getSportList();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private getSportList(): void {
    this.sportList$ = this.store.select(selectAll)
      .pipe(takeUntil(this.componentDestroyed$));

    this.store.dispatch(new SportListLoad());
  }
}
