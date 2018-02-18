import { IAppState } from './store';
import { Action } from 'redux';
import { TetrisActions, InitBoardAction } from './actions';

// export function rootReducer(
//     lastState: IAppState,
//     action: Action
// ): IAppState {
//     switch (action.type) {
//         case TetrisActions.INIT_BOARD:
//         return {
//             board: (action as InitBoardAction).payload,
//             lose: lastState.lose,
//             current: lastState.current,
//             currentX: lastState.currentX,
//             currentY: lastState.currentY
//         };
//       default:
//         return lastState;
//     }
// }
