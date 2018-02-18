import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState, INITIAL_STATE, rootReducer } from '../../state/store';
import { TetrisActions } from '../../state/actions';
import { Store, createStore } from 'redux';

export const store: Store<IAppState> = createStore(
  rootReducer,
);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
  ],
  providers: [
    TetrisActions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  onstructor(ngRedux: NgRedux<IAppState>) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(rootReducer,
      INITIAL_STATE);
    // ngRedux.provideStore(store);
  }
}
