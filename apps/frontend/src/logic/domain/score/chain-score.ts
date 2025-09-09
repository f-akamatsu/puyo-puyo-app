import { OneChainEvent } from '../field/events/chain-event';

/**
 * 1連鎖分の得点
 */
export class ChainScore {
  private static readonly CHAIN_BONUS = [
    0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512,
  ];
  private static readonly CONNECT_BONUS = [0, 2, 3, 4, 5, 6, 7, 10];
  private static readonly COLOR_BONUS = [0, 3, 6, 12, 24];

  /** 消去数 */
  private readonly _popNum: number;
  /** 連鎖数 */
  private readonly _chainNum: number;
  /** 色数 */
  private readonly _colorNum: number;
  /** 連結数 */
  private readonly _connectNums: number[];
  /** 得点 */
  private readonly _score: number;
  /** ボーナス（chain+color+connect、0なら1） */
  private readonly _bonus: number;

  constructor(chainNum: number, colorNum: number, connectNums: number[]) {
    const popNum = connectNums.reduce((sum, n) => {
      return sum + n;
    }, 0);
    this._popNum = popNum;
    this._chainNum = chainNum;
    this._colorNum = colorNum;
    this._connectNums = connectNums;
    const bonus = this.calcBonus(chainNum, colorNum, connectNums);
    this._bonus = bonus;
    this._score = popNum * bonus * 10;
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
    const chainBonus = ChainScore.CHAIN_BONUS[chainNum - 1];

    // 色数
    const colorBonus = ChainScore.COLOR_BONUS[colorNum - 1];

    // 連結
    const connectBonus = connectNums.reduce((sum, connectNum) => {
      const index = (connectNum > 11 ? 11 : connectNum) - 4;
      return sum + ChainScore.CONNECT_BONUS[index];
    }, 0);

    const bonus = colorBonus + chainBonus + connectBonus;
    return bonus === 0 ? 1 : bonus;
  }

  /** 得点 */
  get score(): number {
    return this._score;
  }

  /** ボーナス値（常に1以上） */
  get bonus(): number {
    return this._bonus;
  }

  /** 消去数 */
  get popNum(): number {
    return this._popNum;
  }

  /** 基本点（消去数×10） */
  get base(): number {
    return this._popNum * 10;
  }

  /** 連鎖数 */
  get chainNum(): number {
    return this._chainNum;
  }

  /** 色数 */
  get colorNum(): number {
    return this._colorNum;
  }

  /** 連結数 */
  get connectNums(): number[] {
    return [...this._connectNums];
  }

  /**
   * 一連鎖分のイベントから得点を計算する
   */
  public static fromOneChainEvent(oneChainEvent: OneChainEvent, chainNum: number): ChainScore {
    const eraseEvent = oneChainEvent.eraseEvent;
    return new ChainScore(chainNum, eraseEvent.colorNum, eraseEvent.connectNums);
  }
}
