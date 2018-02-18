export class MyConstant {
    // 横10マス
    public static readonly COLS = 10;
    // 縦20マス
    public static readonly ROWS = 20;
    // 盤面の幅
    public static readonly BOARD_WIDTH = 300;
    // 盤面の高さ
    public static readonly BOARD_HEIGHT = 600;
    // マスの幅
    public static readonly BLOCK_WIDTH = MyConstant.BOARD_WIDTH / MyConstant.COLS;
    // マスの高さ
    public static readonly BLOCK_HEIGHT = MyConstant.BOARD_WIDTH / MyConstant.COLS;
    // 操作するブロックのパターン
    public static readonly SHAPES =
        [
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
}
