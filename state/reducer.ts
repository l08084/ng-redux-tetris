import { IAppState } from './store';
import { Action } from 'redux';
import { TetrisActions, InitBoardAction, InitCurrentAction } from './actions';

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
        case TetrisActions.INIT_CURRENT:
        return {
            board: lastState.board,
            lose: lastState.lose,
            current: (action as InitCurrentAction).payload,
            currentX: lastState.currentX,
            currentY: lastState.currentY
        };
      default:
        return lastState;
    }
}
