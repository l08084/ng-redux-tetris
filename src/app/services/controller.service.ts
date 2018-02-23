import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { TetrisService } from './tetris.service';
import { RenderService } from './render.service';
import { TetrisActions } from '../../../state/actions';
import { select } from '@angular-redux/store';

@Injectable()
export class ControllerService {

  private controllerSubscription: Subscription;

  @select() readonly rotated$: Observable<number[][]>;

  constructor(
    private tetrisAction: TetrisActions,
    private tetrisService: TetrisService,
    private renderService: RenderService,
  ) { }

  init = (): void => {
    this.controllerSubscription
      = Observable.fromEvent(document, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        this.keyPress(e.code);
      });
  }

  keyPress = (eventCode: string): void => {
    switch (eventCode) {
      case 'ArrowLeft':
       if (this.tetrisService.isValid(-1)) {
         this.tetrisAction.decrementCurrentX(); // 左に一つずらす
         this.renderService.render();
       }
        break;
      case 'ArrowRight':
        if (this.tetrisService.isValid(1)) {
          this.tetrisAction.incrementCurrentX(); // 右に一つずらす
          this.renderService.render();
        }
         break;
      case 'ArrowDown':
         if (this.tetrisService.isValid(0, 1)) {
           this.tetrisAction.incrementCurrentY();
           this.renderService.render();
         }
          break;
      case 'ArrowUp':
        this.tetrisAction.rotate();
        if (this.tetrisService.isValid(0, 0, this.rotated$)) {
          // 回せる場合は回したあとの状態に操作ブロックをセットする
          this.rotated$
          .subscribe(rotated => this.tetrisAction.setCurrent(rotated))
          .unsubscribe();
          this.renderService.render();
         }
         break;
      default:
        break;
    }
  }

}
