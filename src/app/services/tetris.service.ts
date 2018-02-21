import { Injectable } from '@angular/core';
import { MyConstant } from '../constant';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { TetrisActions } from '../../../state/actions';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TetrisService {

  // private interval: any; // ゲームを実行するタイマーを保持する変数
  private intervalSubscription: Subscription;

  @select() readonly board$: Observable<number[][]>;

  constructor(private tetrisAction: TetrisActions) { }

  /**
   * ページが読み込まれた時の処理
   *
   * @memberof TetrisService
   */
  newGame = (): void => {
    // clearInterval(this.interval); // ゲームタイマーをクリア
    this.intervalSubscription.unsubscribe();
    // 盤面を空にする
    this.tetrisAction.callInitBoard();
    this.newShape();
    this.tetrisAction.setIsLose(false);
    this.intervalSubscription = Observable.interval(250)
              .subscribe(() => this.tick());
  }

  /**
   * 新しい操作ブロックをセットする関数
   * shapesからランダムにブロックのパターンを出力し、盤面の一番上へセットする
   *
   * @memberof TetrisService
   */
  newShape = (): void => {
    // ランダムにインデックスを出す
    const id = Math.floor(Math.random() * MyConstant.SHAPES.length);
    const shape = MyConstant.SHAPES[id];

    // 操作ブロック配列に0をセット
    this.tetrisAction.callInitCurrent();
    // パターンを操作ブロックへセットする
    for (let y = 0; y < 4; y += 1) {
      for (let x = 0; x < 4; x += 1) {
        const i = 4 * y + x;
        if (typeof shape[i] !== 'undefined' && shape[i]) {
          this.tetrisAction.insertShapeToCurrent({
            x: x,
            y: y,
            id: id + 1});
        }
      }
    }

    // ブロックを盤面の上の方にセットする
    this.tetrisAction.setCurrentX(5);
    this.tetrisAction.setCurrentY(0);
  }

  /**
   * ゲームが始まると250ミリ秒毎に呼び出されていく関数(メインループ処理)
   *
   * @memberof TetrisService
   */
  tick = (): void => {
    // 1つ下へ移動する
    if (this.isValid(0, 1)) {
      this.tetrisAction.incrementCurrentY();
    } else {
      // もし着地していたら(1つ下にブロックがあったら)
      this.callFreeze(); // 操作ブロックを盤面へ固定する
      this.tetrisAction.clearLines(); // ライン消去処理
    }
  }

  /**
   * freeze関数は操作ブロックを盤面へセットする関数です。
   * 操作ブロックが着地する際に呼び出されます。
   *
   * @memberof TetrisService
   */
  callFreeze = (): void => {
    for (let y = 0; y < 4; y += 1) {
      for (let x = 0; x < 4; x += 1) {
        this.tetrisAction.freeze({
          x: x,
          y: y
        });
      }
    }
  }

}
