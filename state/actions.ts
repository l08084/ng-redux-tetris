import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { dispatch, NgRedux } from '@angular-redux/store';
import { IAppState } from './store';

export type VoidAction = FluxStandardAction<void, void>;
export type InitBoardAction = FluxStandardAction<number[][], void>;

@Injectable()
export class TetrisActions {
  static readonly INIT_BOARD = 'INIT_BOARD';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  callInitBoard = (): void => {
    const board = Array.from(new Array(20), () => new Array(10).fill(0));
    // this.ngRedux.dispatch(this.initBoard(board));
    this.initBoard(board);
  }

  @dispatch() initBoard = (board: number[][]): InitBoardAction => ({
      type: TetrisActions.INIT_BOARD,
      payload: board,
      meta: undefined
    })

}
