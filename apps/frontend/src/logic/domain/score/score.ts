import { ScoreInterface } from '@/interfaces/FieldInterfaces';
import { ChainEvent } from '../field/events/chain-event';
import { ChainScore } from './chain-score';

/**
 * 連鎖全体の得点
 */
export class Score {
  private readonly _chains: ReadonlyArray<ChainScore>;
  private readonly _total: number;

  constructor(chains: ChainScore[] = []) {
    // 防御的コピー＋凍結で不変化
    this._chains = Object.freeze([...chains]);
    this._total = this._chains.reduce((sum, c) => sum + c.score, 0);
  }

  /** 総得点 */
  get total(): number {
    return this._total;
  }

  /** 連鎖数 */
  get chainCount(): number {
    return this._chains.length;
  }

  /** 各連鎖の明細 */
  get chains(): ReadonlyArray<ChainScore> {
    return this._chains;
  }

  /**
   * コンポーネント側とのインターフェースを生成
   */
  toInterface(): ScoreInterface {
    return { total: this.total };
  }

  /**
   * 連鎖イベントから得点を計算する
   */
  public static fromChainEvent(chainEvent: ChainEvent): Score {
    const chains = chainEvent.chain.map((oneChain, idx) => {
      const chainNum = idx + 1;
      return ChainScore.fromOneChainEvent(oneChain, chainNum);
    });
    return new Score(chains);
  }
}
