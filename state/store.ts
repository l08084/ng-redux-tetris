import { Action } from 'redux';
import { TetrisActions, InitBoardAction } from '../state/actions';

export interface IAppState {
    board: number[][]; // 盤面情報
    lose: boolean; // 一番上までいっちゃったかどうか
    current: number[][]; // 今操作しているブロックの形
    currentX: number; // ブロックの現在の座標
    currentY: number; // ブロックの現在の座標
}

export const INITIAL_STATE: IAppState = {
    board: null, // 盤面情報
    lose: false, // 一番上までいっちゃったかどうか
    current: null, // 今操作しているブロックの形
    currentX: null,
    currentY: null
};

export function rootReducer(
    lastState: IAppState,
    action: Action
): IAppState {
    switch (action.type) {
        case TetrisActions.INIT_BOARD:
        return {
            board: (action as InitBoardAction).payload,
            lose: lastState.lose,
            current: lastState.current,
            currentX: lastState.currentX,
            currentY: lastState.currentY
        };
      default:
        return lastState;
    }
}
