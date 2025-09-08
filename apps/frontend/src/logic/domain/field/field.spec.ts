import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldService } from '@/logic/service/field.service';
import { describe, expect, it } from 'vitest';
import { Field } from './field';

const G = 1; // green
const R = 2; // red
const O = 9; // ojama

function fp(puyoColor: number, x: number, y: number): FieldPuyoInterface {
  return {
    puyoColor,
    fieldCoord: { x, y },
    connect: { above: false, right: false, below: false, left: false },
  };
}

describe('Field の消去/落下/連鎖', () => {
  it('4連結と隣接おじゃまを消去し、40点になる', () => {
    const initial: FieldPuyoInterface[] = [
      fp(G, 0, 0),
      fp(G, 1, 0),
      fp(G, 2, 0),
      fp(G, 3, 0),
      fp(O, 4, 0), // adjacent ojama should also be erased
    ];

    const field = Field.from(initial);
    const chainEvent = field.chain();

    // After chain there should be nothing left
    expect(field.toInterface().length).toBe(0);

    // Score calculation via service path
    const service = new FieldService();
    const result = service.dropAndChain(initial);
    expect(result.score.total).toBe(40);
    expect(result.fieldPuyos.length).toBe(0);
  });

  it('2連鎖（40 + 320 = 360）を成立させて合計を検証する', () => {
    // 1連鎖目: 下段の緑4連結を消去
    // 2連鎖目: 上段の赤が 2x2 ブロック（4連結）になって落下し発火
    const initial: FieldPuyoInterface[] = [
      fp(G, 0, 0),
      fp(G, 1, 0),
      fp(G, 2, 0),
      fp(G, 3, 0),

      fp(R, 2, 1),
      fp(R, 3, 1),
      fp(R, 4, 0),
      fp(R, 5, 0),
    ];

    const service = new FieldService();
    const result = service.dropAndChain(initial);

    // 1st chain: 4 greens -> 40
    // 2nd chain: 4 reds with chain bonus 8 -> 4*8*10 = 320
    expect(result.score.total).toBe(360);
    expect(result.fieldPuyos.length).toBe(0);
  });
});
