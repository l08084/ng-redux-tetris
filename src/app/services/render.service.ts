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
    this.context.clearRect(0, 0, MyConstant.BOARD_WIDTH, MyConstant.BOARD_HEIGHT); // 一度キャンバスを真っさらにする
    this.context.strokeStyle = '#2F2F2F';

    Observable.combineLatest(
      this.board$,
      this.current$,
      this.currentX$,
      this.currentY$,
      (board, current, currentX, currentY) => {
        // 盤面を描画する
        for (let x = 0; x < MyConstant.COLS; x += 1) {
          for (let y = 0; y < MyConstant.ROWS; y += 1) {
            if (board[y][x]) { // マスが空、つまり0ではなかったら
              this.context.fillStyle = '#97D2FB';
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
              this.context.fillStyle = '#97D2FB';
              // マスを描画
              this.drawBlock(currentX + x, currentY + y);
            }
          }
        }
      }
    ).subscribe().unsubscribe();
  }

  drawBlock = (x: number, y: number): void => {
       this.context.fillRect(MyConstant.BLOCK_WIDTH * x,
                            MyConstant.BLOCK_HEIGHT * y,
                            MyConstant.BLOCK_WIDTH - 1,
                            MyConstant.BLOCK_HEIGHT - 1);

    this.context.strokeRect(MyConstant.BLOCK_WIDTH * x,
                            MyConstant.BLOCK_HEIGHT * y,
                            MyConstant.BLOCK_WIDTH - 1,
                            MyConstant.BLOCK_HEIGHT - 1);
  }

}
