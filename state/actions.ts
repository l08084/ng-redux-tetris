import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { dispatch, NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { InsertShapeToCurrentParam } from '../src/app/model';

export type InitBoardAction = FluxStandardAction<number[][], void>;
export type InitCurrentAction = FluxStandardAction<number[][], void>;
export type InsertShapeToCurrentAction = FluxStandardAction<InsertShapeToCurrentParam, void>;

@Injectable()
export class TetrisActions {
  static readonly INIT_BOARD = 'INIT_BOARD';
  static readonly INIT_CURRENT = 'INIT_CURRENT';
  static readonly INSERT_SHAPE_TO_CURRENT = 'INSERT_SHAPE_TO_CURRENT';

  callInitBoard = (): void => {
    // 2次元配列に0を代入する
    const board = Array.from(new Array(20), () => new Array(10).fill(0));
    this.initBoard(board);
  }

  callInitCurrent = (): void => {
    // 2次元配列に0を代入する
    const current = Array.from(new Array(4), () => new Array(4).fill(0));
    this.initCurrent(current);
  }

  @dispatch() initBoard = (board: number[][]): InitBoardAction => ({
      type: TetrisActions.INIT_BOARD,
      payload: board,
      meta: undefined
  })

  @dispatch() initCurrent = (current: number[][]): InitCurrentAction => ({
    type: TetrisActions.INIT_CURRENT,
    payload: current,
    meta: undefined
  })

  @dispatch() insertShapeToCurrent
    = (insertShapeToCurrentParam: InsertShapeToCurrentParam): InsertShapeToCurrentAction => ({
    type: TetrisActions.INSERT_SHAPE_TO_CURRENT,
    payload: insertShapeToCurrentParam,
    meta: undefined
  })
}
