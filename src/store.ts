import { Action } from 'redux';
import { TetrisActions } from './app/app.actions';

export interface IAppState {
    cols: number; // 横10マス
    rows: number; // 縦20マス
    campasWidth: number; // 盤面の幅
    campasHeight: number; // 盤面の高さ
    blockWidth: number; // マスの幅
    blockHeight: number; // マスの高さ
    shapes: number[][]; // 操作するブロックのパターン
    board: number[][]; // 盤面情報
    lose: boolean; // 一番上までいっちゃったかどうか
    interval: any; // ゲームを実行するタイマーを保持する変数
    current: number[][]; // 今操作しているブロックの形
    currentX: number; // ブロックの現在の座標
    currentY: number; // ブロックの現在の座標
}

export const INITIAL_STATE: IAppState = {
    cols: 10, // 横10マス
    rows: 20, // 縦20マス
    campasWidth: 300,
    campasHeight: 600,
    blockWidth: this.campasWidth / this.cols, // マスの幅
    blockHeight: this.campasHeight / this.rows, // マスの高さ
    // 操作するブロックのパターン
    shapes: [
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
    ],

    board: null, // 盤面情報
    lose: false, // 一番上までいっちゃったかどうか
    interval: null, // ゲームを実行するタイマーを保持する変数
    current: null, // 今操作しているブロックの形
    currentX: null,
    currentY: null
};

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  // switch (action.type) {
  //   case TetrisActions.INCREMENT: return { count: lastState.count + 1 };
  //   case TetrisActions.DECREMENT: return { count: lastState.count - 1 };
  // }

  // We don't care about any other actions right now.
  return lastState;
}
