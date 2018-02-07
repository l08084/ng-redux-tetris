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
    }

}
