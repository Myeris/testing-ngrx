import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// app
import { AppComponent } from './app.component';
import {LifecycleComponent} from './+shared/components/lifecycle/lifecycle.component';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './+shared/store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SportEffects} from './+shared/store/sport/effects/sport.effects';

@NgModule({
  declarations: [
    AppComponent,
    LifecycleComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      SportEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
