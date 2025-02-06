/**
 * 得点
 */
export class Score {
  private static readonly CHAIN_BONUS = [
    0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512,
  ];
  private static readonly CONNECT_BONUS = [0, 2, 3, 4, 5, 6, 7, 10];
  private static readonly COLOR_BONUS = [0, 3, 6, 12, 24];

  /** 消去数 */
  private _popNum: number;
  /** 連鎖数 */
  private _chainNum: number;
  /** 色数 */
  private _colorNum: number;
  /** 連結数 */
  private _connectNums: number[];
  /** 得点 */
  private _score: number;

  constructor(chainNum: number, colorNum: number, connectNums: number[]) {
    const popNum = connectNums.reduce((sum, n) => {
      return sum + n;
    }, 0);
    this._popNum = popNum;
    this._chainNum = chainNum;
    this._colorNum = colorNum;
    this._connectNums = connectNums;
    this._score = this.calcScore(popNum, chainNum, colorNum, connectNums);
  }

  /**
   * 得点を計算する
   */
  private calcScore(
    popNum: number,
    chainNum: number,
    colorNum: number,
    connectNums: number[]
  ): number {
    const bonus = popNum > 0 ? this.calcBonus(chainNum, colorNum, connectNums) : 0;
    const score = popNum * bonus * 10;
    return score;
  }

  /**
   * ボーナスを計算する
   */
  private calcBonus(chainNum: number, colorNum: number, connectNums: number[]): number {
    // 連鎖
    const chainBonus = Score.CHAIN_BONUS[chainNum - 1];

    // 色数
    const colorBonus = Score.COLOR_BONUS[colorNum - 1];

    // 連結
    const connectBonus = connectNums.reduce((sum, connectNum) => {
      const index = (connectNum > 11 ? 11 : connectNum) - 4;
      return sum + Score.CONNECT_BONUS[index];
    }, 0);

    const bonus = colorBonus + chainBonus + connectBonus;
    return bonus === 0 ? 1 : bonus;
  }
}
