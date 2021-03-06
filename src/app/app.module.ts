import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState, INITIAL_STATE } from '../../state/store';
import { TetrisActions } from '../../state/actions';
import { Store, createStore } from 'redux';
import { rootReducer } from '../../state/reducer';
import { TetrisService } from './services/tetris.service';
import { RenderService } from './services/render.service';
import { ControllerService } from './services/controller.service';

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
    TetrisService,
    RenderService,
    ControllerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer,
      INITIAL_STATE);
  }
}
