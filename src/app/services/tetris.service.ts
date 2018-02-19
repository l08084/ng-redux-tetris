import { Injectable } from '@angular/core';
import { MyConstant } from '../constant';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { TetrisActions } from '../../../state/actions';

@Injectable()
export class TetrisService {

  @select() readonly board$: Observable<number[][]>;

  constructor(private tetrisAction: TetrisActions) { }

  /**
   * 新しい操作ブロックをセットする関数
   * shapesからランダムにブロックのパターンを出力し、盤面の一番上へセットする
   *
   * @memberof AppComponent
   */
  newShape() {
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
    this.currentX = 5;
    this.currentY = 0;
  }

}
