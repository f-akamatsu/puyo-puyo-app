import type { OjamaForecastInterface, OjamaPackInterface } from '@/interfaces/OjamaInterfaces';
import { Score } from '@/logic/domain/score/score';
import { OjamaDenomination } from './ojama-denomination';

/**
 * おじゃま予告
 */
export class OjamaForecast {
  /** おじゃま個数 */
  private readonly _ojamaCount: number;
  /** おじゃま単位ごとの明細 */
  private readonly _packs: ReadonlyArray<OjamaPack>;

  private constructor(ojamaCount: number) {
    this._ojamaCount = ojamaCount;
    this._packs = OjamaForecast.packsFromCount(this._ojamaCount);
  }

  /** おじゃま個数 */
  get ojamaCount(): number {
    return this._ojamaCount;
  }

  /**
   * スコアから生成
   */
  public static fromScore(score: Score): OjamaForecast {
    const total = score.total;
    const ojama = Math.floor(Math.max(0, Math.floor(total)) / POINTS_PER_OJAMA);
    return new OjamaForecast(ojama);
  }

  get packs(): ReadonlyArray<OjamaPack> {
    return this._packs;
  }

  /**
   * インターフェースへ変換
   */
  toInterface(): OjamaForecastInterface {
    const packs: OjamaPackInterface[] = this._packs.map((p) => ({
      type: p.denomination.type,
      unit: p.denomination.unit,
      count: p.count,
    }));
    return {
      ojamaCount: this._ojamaCount,
      packs,
    };
  }

  /**
   * おじゃま個数からおじゃま単位ごとに分解
   */
  private static packsFromCount(count: number): ReadonlyArray<OjamaPack> {
    const total = Math.max(0, Math.floor(count));
    let remaining = total;
    const result: OjamaPack[] = [];

    const dens = [...OjamaDenomination.values].sort((a, b) => b.unit - a.unit);
    for (const d of dens) {
      if (remaining <= 0) break;
      const n = Math.floor(remaining / d.unit);
      if (n > 0) {
        result.push({ denomination: d, count: n });
        remaining -= n * d.unit;
      }
    }
    return Object.freeze(result);
  }
}

/**
 * おじゃま1個 = 70点
 */
const POINTS_PER_OJAMA = 70;

export type OjamaPack = {
  denomination: OjamaDenomination;
  count: number;
};
