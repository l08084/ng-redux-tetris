import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import { MyConstant } from './constant';

import { select, NgRedux } from '@angular-redux/store';
import { TetrisActions } from '../../state/actions';
import { IAppState } from '../../state/store';
import { TetrisService } from './services/tetris.service';
import { RenderService } from './services/render.service';
import { ControllerService } from './services/controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @select() readonly board$: Observable<number[][]>;
  @select() readonly score$: Observable<number>;
  @select() readonly digitalTimer$: Observable<number>;
  @select() readonly isGameStart$: Observable<boolean>;

  @ViewChild('campas') campas;

  private renderSubscription: Subscription;
  private timerSubscription: Subscription;
  private controllerSubscription: Subscription;

  constructor(
    private tetrisAction: TetrisActions,
    private tetrisService: TetrisService,
    private renderService: RenderService,
    private controllerService: ControllerService,
  ) {}

  ngOnDestroy() {
    this.renderSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
    this.controllerSubscription.unsubscribe();
  }

  ngOnInit() {
    this.controllerSubscription
      = Observable.fromEvent(document, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        this.callGameStart(e.code);
        this.controllerService.keyPress(e.code);
      });
  }

  callGameStart = (eventCode: string): void => {
    if (eventCode !== 'Space') {
      return;
    }
    this.tetrisAction.gameStart();
    setTimeout(() => this.gameSetting(), 500);
  }

  gameSetting = (): void => {
    this.tetrisService.newGame();
    let time = 0;
    this.timerSubscription = Observable.interval(100).subscribe(
      () => {
        time += 1;
        this.tetrisAction
          .updateTime(`${Math.floor(time / 600)}:${Math.floor((time / 10) % 60)}:${(time % 10)}0`);
      }
    );
    const canvas = this.campas.nativeElement;
    const context = canvas.getContext('2d');
    this.renderService.setContext(context);
    // 30ミリ秒ごとに状態を描画する関数を呼び出す
    this.renderSubscription = Observable.interval(30)
      .subscribe(() => this.renderService.render());
  }

}
