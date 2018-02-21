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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @select() readonly board$: Observable<number[][]>;
  @ViewChild('campas') campas;

  private subscription: Subscription;

  constructor(
    private tetrisAction: TetrisActions,
    private tetrisService: TetrisService,
    private renderService: RenderService,
  ) {
    this.subscription = this.board$.subscribe(console.log);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.tetrisService.newGame();
  }

  ngAfterViewInit() {
    const canvas = this.campas.nativeElement;
    const context = canvas.getContext('2d');
    this.renderService.setContext(context);
    // 30ミリ秒ごとに状態を描画する関数を呼び出す
    Observable.interval(30).subscribe(() => this.renderService.render());
  }

  // /**
  //  * 盤面を空にする
  //  *
  //  * @memberof AppComponent
  //  */
  // init() {
  //   // 2次元配列に0をセット
  //   // this.board = Array.from(new Array(20), () => new Array(10).fill(0));
  // }

  // ngAfterViewInit() {}

  // private readonly cols = 10; // 横10マス
  // private readonly rows = 20; // 縦20マス
  // private readonly campasWidth = 300;
  // private readonly campasHeight = 600;
  // private readonly blockWidth = this.campasWidth / this.cols; // マスの幅
  // private readonly blockHeight = this.campasHeight / this.rows; // マスの高さ
  // // 操作するブロックのパターン
  // private readonly shapes = [
  //   [1, 1, 1, 1],
  //   [1, 1, 1, 0,
  //     1],
  //   [1, 1, 1, 0,
  //     0, 0, 1],
  //   [1, 1, 0, 0,
  //     1, 1],
  //   [1, 1, 0, 0,
  //     0, 1, 1],
  //   [0, 1, 1, 0,
  //     1, 1],
  //   [0, 1, 0, 0,
  //     1, 1, 1]
  // ];

  // private subscription: Subscription;

  // private board: number[][]; // 盤面情報
  // private lose: boolean; // 一番上までいっちゃったかどうか
  // private interval: any; // ゲームを実行するタイマーを保持する変数
  // private current: number[][]; // 今操作しているブロックの形
  // private currentX: number;
  // private currentY: number;

  // private context: CanvasRenderingContext2D;

  // @ViewChild('campas') campas;

  // constructor(private controllerService: ControllerService) { }

  // ngAfterViewInit() {
  //   const canvas = this.campas.nativeElement;
  //   this.context = canvas.getContext('2d');
  //   // 30ミリ秒ごとに状態を描画する関数を呼び出す
  //   setInterval(() => this.render(), 30);
  // }

  // ngOnInit() {
  //   this.newGame();
  //   this.subscription = Observable.fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
  //     this.keyPress(e);
  //   });
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  // keyPress(event: KeyboardEvent) {
  //   switch (event.code) {
  //     case 'ArrowLeft':
  //      if (this.isMobile(-1)) {
  //        this.currentX -= 1; // 左に一つずらす
  //        this.render();
  //      }
  //       break;
  //     case 'ArrowRight':
  //       if (this.isMobile(1)) {
  //         this.currentX += 1; // 右に一つずらす
  //         this.render();
  //       }
  //        break;
  //     case 'ArrowDown':
  //        if (this.isMobile(0, 1)) {
  //          this.currentY += 1; // 右に一つずらす
  //          this.render();
  //        }
  //         break;
  //     case 'Space':
  //       const rotated = this.rotate(this.current);
  //       if (this.isMobile(0, 0, rotated)) {
  //         this.current = rotated;  // 回せる場合は回したあとの状態に操作ブロックをセットする
  //         this.render();
  //        }
  //        break;
  //     default:
  //       break;
  //   }
  // }

  // rotate(current: number[][]) {
  //   const newCurrent = [];
  //   for (let y = 0; y < 4; y += 1) {
  //     newCurrent[y] = [];
  //     for (let x = 0; x < 4; x += 1) {
  //       newCurrent[y][x] = current[3 - x][y];
  //     }
  //   }
  //   return newCurrent;
  // }

  // /**
  //  * ページが読み込まれた時の処理
  //  *
  //  * @memberof AppComponent
  //  */
  // newGame() {
  //   clearInterval(this.interval); // ゲームタイマーをクリア
  //   this.init();
  //   this.newShape();
  //   this.lose = false;
  //   this.interval = setInterval(() => this.tick(), 250);
  // }

  // /**
  //  * 盤面を空にする
  //  *
  //  * @memberof AppComponent
  //  */
  // init() {
  //   // 2次元配列に0をセット
  //   this.board = Array.from(new Array(20), () => new Array(10).fill(0));
  // }

  // /**
  //  * 新しい操作ブロックをセットする関数
  //  * shapesからランダムにブロックのパターンを出力し、盤面の一番上へセットする
  //  *
  //  * @memberof AppComponent
  //  */
  // newShape() {
  //   // ランダムにインデックスを出す
  //   const id = Math.floor(Math.random() * this.shapes.length);
  //   const shape = this.shapes[id];
  //   // パターンを操作ブロックへセットする
  //   this.current = [];
  //   // 4 * 4の2次元配列を作成し、全部に0をセット

  //   for (let y = 0; y < 4; y += 1) {
  //     this.current[y] = [];
  //     for (let x = 0; x < 4; x += 1) {
  //       const i = 4 * y + x;
  //       if (typeof shape[i] !== 'undefined' && shape[i]) {
  //         this.current[y][x] = id + 1;
  //       } else {
  //         this.current[y][x] = 0;
  //       }
  //     }
  //   }

  //   // ブロックを盤面の上の方にセットする
  //   this.currentX = 5;
  //   this.currentY = 0;
  // }

  // /**
  //  * その方向へ操作ブロックを移動できるかどうかを返す
  //  *
  //  * @param {number} [offsetX=0]
  //  * @param {number} [offsetY=0]
  //  * @param {any} [newCurrent=this.current]
  //  * @returns {boolean}
  //  * @memberof AppComponent
  //  */
  // isMobile(offsetX = 0, offsetY = 0, newCurrent = this.current): boolean {
  //   offsetX = this.currentX + offsetX;
  //   offsetY = this.currentY + offsetY;
  //   for (let y = 0; y < 4; y += 1) {
  //     for (let x = 0; x < 4; x += 1) {
  //       if (newCurrent[y][x]) {
  //        if (typeof this.board[y + offsetY] === 'undefined'
  //           || typeof this.board[y + offsetY][x + offsetX] === 'undefined'
  //           || this.board[y + offsetY][x + offsetX]
  //           || x + offsetX < 0
  //           || y + offsetY >= this.rows
  //           || x + offsetX >= this.cols) {
  //             if (offsetY === 1
  //                 && (offsetX - this.currentX) === 0
  //                 && (offsetY - this.currentY) === 1
  //                 ) {
  //                   console.log('game over');
  //                   // もし操作ブロックが盤面の上にあったらゲームオーバーにする
  //                   this.lose = true;
  //                 }
  //             return false;
  //           }
  //       }
  //     }
  //   }
  //   return true;
  // }

  // /**
  //  * ゲームが始まると250秒毎に呼び出されていく関数(メインループ処理)
  //  *
  //  * @memberof AppComponent
  //  */
  // tick() {
  //   // 1つ下へ移動する
  //   if (this.isMobile(0, 1)) {
  //     this.currentY += 1;
  //   } else {
  //     // もし着地していたら(1つ下にブロックがあったら)
  //     this.freeze(); // 操作ブロックを盤面へ固定する
  //     this.clearLines(); // ライン消去処理
  //     if (this.lose) {
  //       // もしゲームオーバーなら最初から始める
  //       this.newGame();
  //       return false;
  //     }
  //     // 新しい操作ブロックをセットする
  //     this.newShape();
  //   }
  // }

  // /**
  //  * 盤面と操作ブロックを描画する
  //  *
  //  * @memberof AppComponent
  //  */
  // render() {
  //   if (this.context) {
  //     this.context.clearRect(0, 0, this.campasWidth, this.campasHeight); // 一度キャンバスを真っさらにする
  //     this.context.strokeStyle = '#FFFF66'; // えんぴつの色を黒にする

  //     // 盤面を描画する
  //     for (let x = 0; x < this.cols; x += 1) {
  //       for (let y = 0; y < this.rows; y += 1) {
  //         if (this.board[y][x]) { // マスが空、つまり0ではなかったら
  //           // マスの種類に合わせて塗りつぶす色を設定
  //           this.context.fillStyle = '#18A03C';
  //           // マスを描画
  //           this.drawBlock(x, y);
  //         }
  //       }
  //     }

  //     // 操作ブロックを描画する
  //     for (let y = 0; y < 4; y += 1) {
  //       for (let x = 0; x < 4; x += 1) {
  //         if (this.current[y][x]) {
  //           // マスの種類に合わせて塗りつぶす色を設定
  //           this.context.fillStyle = '#18A03C';
  //           // マスを描画
  //           this.drawBlock(this.currentX + x, this.currentY + y);
  //         }
  //       }
  //     }
  //   }
  // }

  // drawBlock(x: number, y: number) {
  //   this.context.fillRect(this.blockWidth * x,
  //                         this.blockHeight * y,
  //                         this.blockWidth - 1,
  //                         this.blockHeight - 1);

  //   this.context.strokeRect(this.blockWidth * x,
  //                           this.blockHeight * y,
  //                           this.blockWidth - 1,
  //                           this.blockHeight - 1);
  // }

  // /**
  //  * freeze関数は操作ブロックを盤面へセットする関数です。
  //  * 操作ブロックが着地する際に呼び出されます。
  //  *
  //  * @memberof AppComponent
  //  */
  // freeze() {
  //   for (let y = 0; y < 4; y += 1) {
  //     for (let x = 0; x < 4; x += 1) {
  //       if (this.current[y][x]) {
  //         this.board[y + this.currentY][x + this.currentX] = this.current[y][x];
  //       }
  //     }
  //   }
  // }

  // /**
  //  * 一行が揃っているか調べ、揃っていたらそれらを消す
  //  *
  //  * @memberof AppComponent
  //  */
  // clearLines() {
  //   for (let y = this.rows - 1; y >= 0; y -= 1) {
  //     let rowFilled = true;
  //     // 一行が揃っているか調べる
  //     for (let x = 0; x < this.cols; x += 1) {
  //       if (this.board[y][x] === 0) {
  //         rowFilled = false;
  //         break;
  //       }
  //     }
  //     // もし一行揃っていたら, サウンドを鳴らしてそれらを消す。
  //     if (rowFilled) {
  //       // その上にあったブロックを一つずつ落としていく
  //       for (let yy = y; yy > 0; yy -= 1) {
  //         for (let x = 0; x < this.cols; x += 1) {
  //           this.board[yy][x] = this.board[yy - 1][x];
  //         }
  //       }
  //       y += 1; // 一行落としたのでチェック処理を一つ下へ送る
  //     }
  //   }
  // }

}
