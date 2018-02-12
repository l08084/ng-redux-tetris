import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  readonly cols = 10; // 横10マス
  readonly rows = 20; // 縦20マス
  readonly canpasWidth = 300;
  readonly canpasHeight = 600;
  readonly blockWidth = this.canpasWidth / this.cols; // マスの幅
  readonly blockHeight = this.canpasHeight / this.rows; // マスの高さ

  board: number[][]; // 盤面情報
  lose: boolean; // 一番上までいっちゃったかどうか
  // interval: NodeJS.Timer; // ゲームを実行するタイマーを保持する変数
  interval: any;
  current: number[][]; // 今操作しているブロックの形
  currentX: number;
  currentY: number;
  context: CanvasRenderingContext2D;

  @ViewChild('block') block;

  // 操作するブロックのパターン
  // tslint:disable-next-line:member-ordering
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

  // tslint:disable-next-line:member-ordering
  colors = [
    'cyan',
    'orange',
    'blue',
    'yelow',
    'red',
    'green',
    'purple'
  ];

  ngAfterViewInit() {
    const canvas = this.block.nativeElement;
    this.context = canvas.getContext('2d');
    // 30ミリ秒ごとに状態を描画する関数を呼び出す
    setInterval(this.render, 30);
  }

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
    this.interval = setInterval(this.tick(), 250);
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
   * その方向へ操作ブロックを移動できるかどうかを返す
   *
   * @param {number} [offsetX=0]
   * @param {number} [offsetY=0]
   * @param {any} [newCurrent=this.current]
   * @returns {boolean}
   * @memberof AppComponent
   */
  isMobile(offsetX?: number, offsetY?: number, newCurrent?: number[][]): boolean {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    newCurrent = newCurrent || this.current;
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

  /**
   * ゲームが始まると250秒毎に呼び出されていく関数(メインループ処理)
   *
   * @memberof AppComponent
   */
  tick() {
    // 1つ下へ移動する
    if (this.isMobile(0, 1)) {
      this.currentY += 1;
    } else {
      // もし着地していたら(1つ下にブロックがあったら)
      this.freeze(); // 操作ブロックを盤面へ固定する
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

  /**
   * 盤面と操作ブロックを描画する
   *
   * @memberof AppComponent
   */
  render() {
    const ctx = this.context;
    if (ctx) {
      ctx.clearRect(0, 0, this.canpasWidth, this.canpasHeight); // 一度キャンバスを真っさらにする
      ctx.strokeStyle = 'black'; // えんぴつの色を黒にする
      this.board.forEach((array, x) => {
        array.forEach((element, y) => {
          if (element) {
            ctx.fillStyle = this.colors[element - 1];
            this.drawBlock(this.currentX + x, this.currentY + y);
          }
        });
      });
    }
  }

  drawBlock(x: number, y: number) {
    this.context.fillRect(this.blockWidth * x,
                          this.blockHeight * y,
                          this.blockWidth - 1,
                          this.blockHeight - 1);

    this.context.strokeRect(this.blockWidth * x,
                            this.blockHeight * y,
                            this.blockWidth - 1,
                            this.blockHeight - 1);
  }

  /**
   * freeze関数は操作ブロックを盤面へセットする関数です。
   * 操作ブロックが着地する際に呼び出されます。
   *
   * @memberof AppComponent
   */
  freeze() {
    this.current.forEach((array, y) => {
      array.forEach((currentItem, x) => {
        if (currentItem) {
          this.board[y + this.currentY][x + this.currentX] = currentItem;
        }
      });
    });
  }

  /**
   * 一行が揃っているか調べ、揃っていたらそれらを消す
   *
   * @memberof AppComponent
   */
  clearLines() {
    for (let y = this.rows - 1; y >= 0; y -= 1) {
      let rowFilled = true;
      // 一行が揃っているか調べる
      for (let x = 0; x < this.cols; x += 1) {
        if (this.board[y][x] === 0) {
          rowFilled = false;
          break;
        }
      }
      // もし一行揃っていたら, サウンドを鳴らしてそれらを消す。
      if (rowFilled) {
        // document.getElementById('clearsound').play(); // 消滅サウンドを鳴らす
        // その上にあったブロックを一つずつ落としていく
        for (let yy = y; yy > 0; yy -= 1) {
          for (let x = 0; x < this.cols; x += 1) {
            this.board[yy][x] = this.board[yy - 1][x];
          }
        }
        y += 1; // 一行落としたのでチェック処理を一つ下へ送る
      }
    }
  }

}
