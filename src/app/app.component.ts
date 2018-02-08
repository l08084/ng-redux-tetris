import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  cols = 10; // 横10マス
  rows = 20; // 縦20マス
  board: number[][]; // 盤面情報
  lose: boolean; // 一番上までいっちゃったかどうか
  interval: NodeJS.Timer; // ゲームを実行するタイマーを保持する変数
  current: number[][]; // 今操作しているブロックの形
  currentX: number;
  currentY: number;

  // 操作するブロックのパターン
  shapes = [
    [1, 1, 1, 1],
    [1, 1, 1, 0,
      1],
    [1, 1, 1, 0,
      0, 0, 1],
    [1, 1, 0, 0,
      1, 1],
    [1, 1, 0, 0,
      0, 1, 1],
    [0, 1, 1, 0,
      1, 1],
    [0, 1, 0, 0,
      1, 1, 1]
  ];

  colors = [
    'cyan',
    'orange',
    'blue',
    'yelow',
    'red',
    'green',
    'purple'
  ];

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.newGame();
  }

  /**
   * ページが読み込まれた時の処理
   *
   * @memberof AppComponent
   */
  newGame() {
    clearInterval(this.interval); // ゲームタイマーをクリア
    this.init();
    this.newShape();
    this.lose = false;
    this.interval = setInterval(this.tick, 250);
  }

  /**
   * 盤面を空にする
   *
   * @memberof AppComponent
   */
  init() {
    // 2次元配列に0をセット
    this.board = Array.from(new Array(20), () => new Array(10).fill(0));
  }

  /**
   * 新しい操作ブロックをセットする関数
   * shapesからランダムにブロックのパターンを出力し、盤面の一番上へセットする
   *
   * @memberof AppComponent
   */
  newShape() {
      // ランダムにインデックスを出す
      const id = Math.floor(Math.random() * this.shapes.length);
      const shape = this.shapes[id];
      // パターンを操作ブロックへセットする
      this.current = [];
      // 4 * 4の2次元配列を作成し、全部に0をセット
      this.current = Array.from(new Array(4), () => new Array(4).fill(0));

      // for (let y = 0 ; y < 4; ++y) {
      //   for (let x = 0; x < 4; ++x) {
      //     const i = 4 * y + x;
      //     if (shape[i]) {
      //       this.current[y][x] = id + 1;
      //     }
      //   }
      // }
      this.current.forEach((array, y) => {
        array.forEach((currentItem, x) => {
          const i = 4 * y + x;
          if (shape[i]) {
            currentItem = id + 1;
          }
        });
      });

      // ブロックを盤面の上の方にセットする
      this.currentX = 5;
      this.currentY = 0;
    }

  /**
   * ゲームが始まると250秒毎に呼び出されていく関数(メインループ処理)
   *
   * @memberof AppComponent
   */
  tick() {
    // 1つ下へ移動する
    if (this.valid(0, 1)) {
      this.currentY += 1;
    } else {
      // もし着地していたら(1つ下にブロックがあったら)
      this.freez(); // 操作ブロックを盤面へ固定する
      this.clearLines(); // ライン消去処理
      if (this.lose) {
        // もしゲームオーバーなら最初から始める
        this.newGame();
        return false;
      }
      // 新しい操作ブロックをセットする
      this.newShape();
    }
  }

  valid(offsetX = 0, offsetY = 0, newCurrent = this.current): boolean {
    offsetX = this.currentX + offsetX;
    offsetY = this.currentY + offsetY;
    for (let y = 0; y < 4; y += 1) {
      for (let x = 0; x < 4; x += 1) {
        if (newCurrent[y][x]) {
         if (this.board[y + offsetY]
            || this.board[y + offsetY][x + offsetX]
            || x + offsetX < 0
            || y + offsetY >= this.rows
            || x + offsetX >= this.cols) {
              if (offsetY === 1
                  && (offsetX - this.currentX) === 0
                  && (offsetY - this.currentY) === 1
                  ) {
                    console.log('game over');
                    // もし操作ブロックが盤面の上にあったらゲームオーバーにする
                    this.lose = true;
                  }
              return false;
            }
        }
      }
    }
    return true;
  }

}
