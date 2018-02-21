import { IAppState } from './store';
import { Action } from 'redux';
import { TetrisActions,
         FreezeAction,
         NumberMultidimensionalArrayAction,
         InsertShapeToCurrentAction,
         NumberAction,
         BooleanAction} from './actions';
import { MyConstant } from '../src/app/constant';
import { Point } from '../src/app/model';

export function rootReducer(
    lastState: IAppState,
    action: Action
): IAppState {
    switch (action.type) {
        case TetrisActions.INIT_BOARD:
            return {
                board: (action as NumberMultidimensionalArrayAction).payload,
                isLose: lastState.isLose,
                current: lastState.current,
                currentX: lastState.currentX,
                currentY: lastState.currentY
            };
        case TetrisActions.INIT_CURRENT:
            return {
                board: lastState.board,
                isLose: lastState.isLose,
                current: (action as NumberMultidimensionalArrayAction).payload,
                currentX: lastState.currentX,
                currentY: lastState.currentY
            };
        case TetrisActions.INSERT_SHAPE_TO_CURRENT:
            const x = (action as InsertShapeToCurrentAction).payload.x;
            const y = (action as InsertShapeToCurrentAction).payload.y;
            const id = (action as InsertShapeToCurrentAction).payload.id;
            // 配列の値渡し
            const newCurrent = lastState.current.concat();
            newCurrent[y][x] = id;
            return {
                board: lastState.board,
                isLose: lastState.isLose,
                current: newCurrent,
                currentX: lastState.currentX,
                currentY: lastState.currentY
            };
        case TetrisActions.SET_CURRENT_X:
            return {
                board: lastState.board,
                isLose: lastState.isLose,
                current: lastState.current,
                currentX: (action as NumberAction).payload,
                currentY: lastState.currentY
            };
        case TetrisActions.SET_CURRENT_Y:
            return {
                board: lastState.board,
                isLose: lastState.isLose,
                current: lastState.current,
                currentX: lastState.currentX,
                currentY: (action as NumberAction).payload
            };
        case TetrisActions.SET_IS_LOSE:
            return {
                board: lastState.board,
                isLose: (action as BooleanAction).payload,
                current: lastState.current,
                currentX: lastState.currentX,
                currentY: lastState.currentY
            };
        case TetrisActions.INCREMENT_CURRENT_Y:
            const newCurrentY = lastState.currentY + 1;
            return {
                board: lastState.board,
                isLose: lastState.isLose,
                current: lastState.current,
                currentX: lastState.currentX,
                currentY: newCurrentY
            };
        case TetrisActions.FREEZE:
            const newBoard = lastState.board.concat();
            const point: Point = (action as FreezeAction).payload;
            if (point && lastState.current[point.y][point.x]) {
                newBoard[point.y + lastState.currentY][point.x + lastState.currentX]
                    = lastState.current[point.y][point.x];
            }
            return {
                board: newBoard,
                isLose: lastState.isLose,
                current: lastState.current,
                currentX: lastState.currentX,
                currentY: newCurrentY
            };
        case TetrisActions.CLEAR_LINES:
          const newBoard_b = lastState.board.concat();
          for (let yy = MyConstant.ROWS - 1; yy >= 0; yy -= 1) {
              let rowFilled = true;
              for (let xx = 0; xx < MyConstant.COLS; xx += 1) {
                  if (newBoard_b[yy][xx] === 0) {
                      rowFilled = false;
                      break;
                  }
              }
              if (rowFilled) {
                  // その上にあったブロックを一つずつ落としていく
                  for (let yyy = yy; yyy > 0; yyy -= 1) {
                    for (let xx = 0; xx < this.cols; xx += 1) {
                      newBoard_b[yyy][xx]  = newBoard_b[yyy - 1][xx];
                    }
                  }
                  yy += 1; // 一行落としたのでチェック処理を一つ下へ送る
              }
          }
          return {
              board: newBoard_b,
              isLose: lastState.isLose,
              current: lastState.current,
              currentX: lastState.currentX,
              currentY: newCurrentY
          };
        default:
            return lastState;
    }
}
