import { describe, it, expect } from 'vitest';
import { OjamaForecast, type OjamaPack } from './ojama-forecast';
import { Score } from '@/logic/domain/score/score';
import { ChainScore } from '@/logic/domain/score/chain-score';
import { OjamaDenomination } from './ojama-denomination';

describe('OjamaForecast.fromScore の変換', () => {
  it('総得点を70で割って切り捨て、おじゃま個数を算出する', () => {
    // 40点 + 40点 = 80点 を用意
    const c1 = new ChainScore(1, 1, [4]); // 40 点
    const c2 = new ChainScore(1, 1, [4]); // 40 点
    const score = new Score([c1, c2]); // 合計 80 点

    const forecast = OjamaForecast.fromScore(score);
    expect(forecast.ojamaCount).toBe(1); // floor(80/70) = 1

    // packs の合計が ojamaCount と一致すること
    const totalFromPacks = forecast.packs.reduce((sum, p) => sum + p.denomination.unit * p.count, 0);
    expect(totalFromPacks).toBe(forecast.ojamaCount);
  });
});

describe('内部関数 packsFromCount の分解ロジック', () => {
  it('73 を 30×2, 6×2, 1×1 に分解する', () => {
    // private static をテストのために参照
    const packs: ReadonlyArray<OjamaPack> = (OjamaForecast as any)['packsFromCount'](73);

    // 各単位の個数が想定通りであること
    const byType = new Map(packs.map((p) => [p.denomination.type, p.count]));
    expect(byType.get(OjamaDenomination.ROCK.type)).toBe(2);   // 30x2=60
    expect(byType.get(OjamaDenomination.MEDIUM.type)).toBe(2); // 6x2=12 (total 72)
    expect(byType.get(OjamaDenomination.SMALL.type)).toBe(1);  // 1x1=1  (total 73)

    // 合計は元の個数と一致する
    const sum = packs.reduce((s, p) => s + p.denomination.unit * p.count, 0);
    expect(sum).toBe(73);
  });

  it('割り切れる場合は単一の大きい単位のみになる（360 => 360×1）', () => {
    const packs: ReadonlyArray<OjamaPack> = (OjamaForecast as any)['packsFromCount'](360);
    expect(packs.length).toBe(1);
    expect(packs[0].denomination).toBe(OjamaDenomination.MOON);
    expect(packs[0].count).toBe(1);
  });
});

