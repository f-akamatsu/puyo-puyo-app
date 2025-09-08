import { describe, expect, it } from 'vitest';
import { FieldCoord } from './field-coord';

describe('FieldCoord の振る舞い', () => {
  it('範囲内で生成でき、最上段はゴースト行になる', () => {
    const c = new FieldCoord(0, 0);
    expect(c.x).toBe(0);
    expect(c.y).toBe(0);

    // top ghost row is y = Y_SIZE - 1
    const ghost = new FieldCoord(0, FieldCoord.Y_SIZE - 1);
    expect(ghost.isGhost()).toBe(true);
  });

  it('範囲外の座標では例外を投げる', () => {
    expect(() => new FieldCoord(-1, 0)).toThrow();
    expect(() => new FieldCoord(6, 0)).toThrow();
    expect(() => new FieldCoord(0, -1)).toThrow();
    expect(() => new FieldCoord(0, 13)).toThrow();
  });
});
