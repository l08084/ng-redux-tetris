import { Injectable } from '@angular/core';
import { MyConstant } from '../constant';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RenderService {

  private context: CanvasRenderingContext2D;

  @select() readonly board$: Observable<number[][]>;
  @select() readonly current$: Observable<number[][]>;
  @select() readonly currentX$: Observable<number>;
  @select() readonly currentY$: Observable<number>;

  constructor() { }

  setContext = (context: CanvasRenderingContext2D): void => {
    this.context = context;
  }

  /**
   * 盤面と操作ブロックを描画する
   *
   * @memberof AppComponent
   */
  render() {
    if (this.context) {
      this.context.clearRect(0, 0, MyConstant.BOARD_WIDTH, MyConstant.BOARD_HEIGHT); // 一度キャンバスを真っさらにする
      this.context.strokeStyle = '#FFFF66'; // えんぴつの色を黒にする

      Observable.combineLatest(
        this.board$,
        this.current$,
        this.currentX$,
        this.currentY$,
        (board, current, currentX, currentY) => {
          // 盤面を描画する
          for (let x = 0; x < MyConstant.ROWS; x += 1) {
            for (let y = 0; y < MyConstant.COLS; y += 1) {
              if (board[y][x]) { // マスが空、つまり0ではなかったら
                this.context.fillStyle = '#18A03C';
                // マスを描画
                this.drawBlock(x, y);
              }
            }
          }

          // 操作ブロックを描画する
          for (let y = 0; y < 4; y += 1) {
            for (let x = 0; x < 4; x += 1) {
              if (current[y][x]) {
                // マスの種類に合わせて塗りつぶす色を設定
                this.context.fillStyle = '#18A03C';
                // マスを描画
                this.drawBlock(currentX + x, currentY + y);
              }
            }
          }
        }
      );


    }
  }

}
