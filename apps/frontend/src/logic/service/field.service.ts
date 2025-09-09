import {
  FieldCoordInterface,
  FieldPuyoInterface,
  ScoreInterface,
} from '@/interfaces/FieldInterfaces';
import { PuyoColor } from '../domain/common/value-objects/puyo-color';
import type {
  ChainEventInterface,
  DropEventInterface,
} from '@/interfaces/EventInterfaces';
import { Field } from '../domain/field/field';
import { FieldCoord } from '../domain/field/value-objects/field-coord';
import { Score } from '../domain/score/score';

/**
 * フィールドサービス
 */
export class FieldService {
  /**
   * フィールドにぷよをセット
   */
  setFieldPuyo(
    fieldPuyosIF: FieldPuyoInterface[],
    newFieldPuyoIF: FieldPuyoInterface
  ): FieldPuyoInterface[] {
    const field = Field.from(fieldPuyosIF);
    const coord = new FieldCoord(newFieldPuyoIF.fieldCoord.x, newFieldPuyoIF.fieldCoord.y);
    const color = PuyoColor.fromValue(newFieldPuyoIF.puyoColor);

    field.setFieldPuyo(coord, color);

    return field.toInterface();
  }

  /**
   * フィールドからぷよを取り除く
   */
  removeFieldPuyo(
    fieldPuyosIF: FieldPuyoInterface[],
    fieldCoordIF: FieldCoordInterface
  ): FieldPuyoInterface[] {
    const field = Field.from(fieldPuyosIF);
    const fieldCoord = FieldCoord.from(fieldCoordIF);

    field.removeFieldPuyo(fieldCoord);

    return field.toInterface();
  }

  /**
   * 宙に浮いているぷよを落としてから連鎖
   */
  dropAndChain(fieldPuyosIF: FieldPuyoInterface[]): {
    fieldPuyos: FieldPuyoInterface[];
    score: ScoreInterface;
  } {
    const field = Field.from(fieldPuyosIF);

    const dropEvent = field.drop();
    const chainEvent = field.chain();

    const score = Score.fromChainEvent(chainEvent);

    return {
      fieldPuyos: field.toInterface(),
      score: score.toInterface(),
    };
  }

  /**
   * 連鎖の詳細イベント付き（UIアニメーション用）
   */
  dropAndChainWithEvents(fieldPuyosIF: FieldPuyoInterface[]): {
    fieldPuyos: FieldPuyoInterface[];
    score: ScoreInterface;
    initialDropEvent: DropEventInterface;
    chainEvent: ChainEventInterface;
  } {
    const field = Field.from(fieldPuyosIF);
    // 直前の浮き落下（通常ルール）。アニメーション用にイベントを返す
    const initialDropEvent = field.drop();
    const chainEvent = field.chain();
    const score = Score.fromChainEvent(chainEvent);

    return {
      fieldPuyos: field.toInterface(),
      score: score.toInterface(),
      initialDropEvent,
      chainEvent,
    };
  }
}
