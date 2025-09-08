import { describe, expect, it } from 'vitest';
import { PuyoColor } from './puyo-color';

describe('PuyoColor の振る舞い', () => {
  it('fromValue が正しい色を返す', () => {
    expect(PuyoColor.fromValue(1)).toBe(PuyoColor.GREEN);
    expect(PuyoColor.fromValue(2)).toBe(PuyoColor.RED);
    expect(PuyoColor.fromValue(3)).toBe(PuyoColor.BLUE);
    expect(PuyoColor.fromValue(4)).toBe(PuyoColor.YELLOW);
    expect(PuyoColor.fromValue(5)).toBe(PuyoColor.PURPLE);
    expect(PuyoColor.fromValue(9)).toBe(PuyoColor.OJAMA);
  });

  it('isColor / isOjama が正しく判定する', () => {
    expect(PuyoColor.GREEN.isColor()).toBe(true);
    expect(PuyoColor.RED.isColor()).toBe(true);
    expect(PuyoColor.BLUE.isColor()).toBe(true);
    expect(PuyoColor.YELLOW.isColor()).toBe(true);
    expect(PuyoColor.PURPLE.isColor()).toBe(true);
    expect(PuyoColor.OJAMA.isColor()).toBe(false);

    expect(PuyoColor.OJAMA.isOjama()).toBe(true);
    expect(PuyoColor.GREEN.isOjama()).toBe(false);
  });
});
