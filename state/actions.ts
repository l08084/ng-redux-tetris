import { Injectable } from '@angular/core';
import { Action, Store } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { dispatch, NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { InsertShapeToCurrentParam, Point } from '../src/app/model';

export type VoidAction = FluxStandardAction<void, void>;
export type NumberAction = FluxStandardAction<number, void>;
export type BooleanAction = FluxStandardAction<boolean, void>;
export type NumberMultidimensionalArrayAction = FluxStandardAction<number[][], void>;
export type InsertShapeToCurrentAction = FluxStandardAction<InsertShapeToCurrentParam, void>;
export type FreezeAction = FluxStandardAction<Point, void>;

@Injectable()
export class TetrisActions {
  static readonly INIT_BOARD = 'INIT_BOARD';
  static readonly INIT_CURRENT = 'INIT_CURRENT';
  static readonly INSERT_SHAPE_TO_CURRENT = 'INSERT_SHAPE_TO_CURRENT';
  static readonly SET_CURRENT_X = 'SET_CURRENT_X';
  static readonly SET_CURRENT_Y = 'SET_CURRENT_Y';
  static readonly SET_IS_LOSE = 'SET_IS_LOSE';
  static readonly INCREMENT_CURRENT_Y = 'INCREMENT_CURRENT_Y';
  static readonly FREEZE = 'FREEZE';
  static readonly CLEAR_LINES = 'CLEAR_LINES';

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

  @dispatch() initBoard = (board: number[][]): NumberMultidimensionalArrayAction => ({
      type: TetrisActions.INIT_BOARD,
      payload: board,
      meta: undefined
  })

  @dispatch() initCurrent = (current: number[][]): NumberMultidimensionalArrayAction => ({
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

  @dispatch() setCurrentX = (positionX: number): NumberAction => ({
    type: TetrisActions.SET_CURRENT_X,
    payload: positionX,
    meta: undefined
  })

  @dispatch() setCurrentY = (positionY: number): NumberAction => ({
    type: TetrisActions.SET_CURRENT_Y,
    payload: positionY,
    meta: undefined
  })

  @dispatch() setIsLose = (isLose: boolean): BooleanAction => ({
    type: TetrisActions.SET_IS_LOSE,
    payload: isLose,
    meta: undefined
  })

  @dispatch() incrementCurrentY = (): VoidAction => ({
    type: TetrisActions.INCREMENT_CURRENT_Y,
    payload: undefined,
    meta: undefined
  })

  @dispatch() freeze = (point: Point): FreezeAction => ({
    type: TetrisActions.FREEZE,
    payload: undefined,
    meta: undefined
  })

  @dispatch() clearLines = (): VoidAction => ({
    type: TetrisActions.CLEAR_LINES,
    payload: undefined,
    meta: undefined
  })
}
