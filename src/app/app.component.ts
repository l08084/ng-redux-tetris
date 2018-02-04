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
    // 2次元配列を空にする
    this.board = Array.from(new Array(20), () => new Array(10).fill(0));
  }

}
