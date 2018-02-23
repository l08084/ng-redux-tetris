import { Action } from 'redux';
import { TetrisActions } from '../state/actions';

export interface IAppState {
    board: number[][]; // 盤面情報
    isLose: boolean; // 一番上までいっちゃったかどうか
    current: number[][]; // 今操作しているブロックの形
    currentX: number; // ブロックの現在の座標
    currentY: number; // ブロックの現在の座標
    rotated: number[][];
}

export const INITIAL_STATE: IAppState = {
    board: null, // 盤面情報
    isLose: false, // 一番上までいっちゃったかどうか
    current: null, // 今操作しているブロックの形
    currentX: null, // ブロックの現在の座標
    currentY: null, // ブロックの現在の座標
    rotated: null,
};
