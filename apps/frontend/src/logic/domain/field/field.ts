import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Coord } from '@/logic/domain/common/value-objects/coord';
import { Optional } from 'typescript-optional';
import { PuyoColor } from '../../domain/common/value-objects/puyo-color';
import { ChainEvent, OneChainEvent } from './events/chain-event';
import { DropEvent, PuyoDropped } from './events/drop-event';
import { ConnectedPuyosErased, EraseEvent } from './events/erase-event';
import { Connect } from './value-objects/connect';
import { FieldCoord } from './value-objects/field-coord';

// Map のキー型（x,y から生成する数値）
type FieldKey = number;

/**
 * フィールド
 * これを集約ルート的に扱う
 */
export class Field {
  private _puyoMap: Map<FieldKey, PuyoColor>;

  constructor(puyoMap: Map<FieldKey, PuyoColor>) {
    this._puyoMap = puyoMap;
  }

  /**
   * 数値キー生成: key = y * X_SIZE + x
   */
  private keyOf(coord: FieldCoord): FieldKey {
    return coord.y * FieldCoord.X_SIZE + coord.x;
  }

  /**
   * 数値キーから座標に復元
   */
  private coordOfKey(key: FieldKey): FieldCoord {
    const x = key % FieldCoord.X_SIZE;
    const y = Math.floor(key / FieldCoord.X_SIZE);
    return new FieldCoord(x, y);
  }

  /**
   * 指定座標の色を取得
   */
  private getColorAt(fieldCoord: FieldCoord): Optional<PuyoColor> {
    return Optional.ofNullable(this._puyoMap.get(this.keyOf(fieldCoord)));
  }

  /**
   * ぷよをセット
   */
  public setFieldPuyo(fieldCoord: FieldCoord, color: PuyoColor): void {
    const key = this.keyOf(fieldCoord);
    this._puyoMap.set(key, color);
  }

  /**
   * ぷよを取り除く
   */
  public removeFieldPuyo(fieldCoord: FieldCoord): void {
    this._puyoMap.delete(this.keyOf(fieldCoord));
  }

  /**
   * 連鎖する
   */
  public chain(): ChainEvent {
    const chain: OneChainEvent[] = [];

    let chainNum = 0;

    while (true) {
      chainNum++;

      // 1) 消す
      const eraseEvent = this.erase();
      if (!eraseEvent.isErased) break;

      // 2) 落とす
      const dropEvent = this.drop();

      const oneChain = new OneChainEvent(eraseEvent, dropEvent);
      chain.push(oneChain);
    }

    return new ChainEvent(chain);
  }

  /**
   * 盤面上の全ての色ぷよについて、
   * 上下左右の同色連結数を算出し、消去対象を決定して消去する。
   * 消去対象となった色ぷよに隣接しているおじゃまぷよも消去する。
   */
  private erase(): EraseEvent {
    const erased: ConnectedPuyosErased[] = [];

    // 1) 色ぷよの消去（DFS/BFS）
    const visited = new Set<FieldKey>();

    for (const [key, color] of this._puyoMap.entries()) {
      const startCoord = this.coordOfKey(key);
      if (!color.isColor()) continue;
      if (startCoord.isGhost()) continue;
      if (visited.has(key)) continue;

      const stack: FieldKey[] = [key];
      const connectedKeys: FieldKey[] = [];

      while (stack.length > 0) {
        const curKey = stack.pop()!;
        if (visited.has(curKey)) continue;
        visited.add(curKey);
        const curCoord = this.coordOfKey(curKey);
        const curColorOpt = this.getColorAt(curCoord);
        if (
          curColorOpt.isEmpty() ||
          !curColorOpt.get().isColor() ||
          !curColorOpt.get().equals(color)
        )
          continue;

        connectedKeys.push(curKey);

        for (const adjacent of Coord.ARBL) {
          try {
            const adjCoord = curCoord.add(adjacent);
            if (adjCoord.isGhost()) continue;
            const adjColorOpt = this.getColorAt(adjCoord);
            if (adjColorOpt.isEmpty()) continue;
            const adjColor = adjColorOpt.get();
            if (!adjColor.isColor() || !adjColor.equals(color)) continue;
            const adjKey = this.keyOf(adjCoord);
            if (!visited.has(adjKey)) stack.push(adjKey);
          } catch {
            // 範囲外は無視
          }
        }
      }

      if (connectedKeys.length >= 4) {
        const coords = connectedKeys.map((k: FieldKey) => this.coordOfKey(k));
        erased.push(new ConnectedPuyosErased(coords, color));
      }
    }

    // 2) おじゃまぷよの消去
    const erasedOjamaKeySet = new Set<FieldKey>();
    const erasedColorPuyoCoords = erased.flatMap((e) => e.coords);

    for (const erasedColorPuyoCoord of erasedColorPuyoCoords) {
      for (const adjacent of Coord.ARBL) {
        let adjacentCoord: FieldCoord;
        try {
          adjacentCoord = erasedColorPuyoCoord.add(adjacent);
        } catch {
          continue;
        }
        if (adjacentCoord.isGhost()) continue;
        const adjacentColorOpt = this.getColorAt(adjacentCoord);
        if (adjacentColorOpt.isEmpty()) continue;
        const adjacentColor = adjacentColorOpt.get();
        if (adjacentColor.isOjama()) {
          erasedOjamaKeySet.add(this.keyOf(adjacentCoord));
        }
      }
    }

    // 3) erased対象を削除
    const erasedKeys = new Set<FieldKey>();
    erased.flatMap((e) => e.coords).forEach((c) => erasedKeys.add(this.keyOf(c)));
    erasedOjamaKeySet.forEach((k) => erasedKeys.add(k));
    erasedKeys.forEach((k) => this._puyoMap.delete(k));

    // 4) イベントを返す
    const event = new EraseEvent(
      erased,
      Array.from(erasedOjamaKeySet).map((k) => this.coordOfKey(k))
    );
    return event;
  }

  /**
   * 浮いているぷよを落とす
   */
  public drop(): DropEvent {
    const dropEvents: PuyoDropped[] = [];

    for (let x = 0; x < FieldCoord.X_SIZE; x++) {
      for (let y = 0; y < FieldCoord.Y_SIZE - 1; y++) {
        // 下の段から順にチェック。
        // ぷよがある場合はスキップ。
        // ぷよがない場合は、それより上にぷよがあるかを確認し、あれば落としてくる。
        // 最上段はそれより上にぷよはないため、チェック不要。
        const toFieldCoord = new FieldCoord(x, y);
        const toColorOpt = this.getColorAt(toFieldCoord);

        if (toColorOpt.isPresent()) {
          continue;
        }

        let fromFieldCoord = new FieldCoord(x, y);
        let fromColorOpt: Optional<PuyoColor>;

        do {
          fromFieldCoord = fromFieldCoord.addY(1);
          fromColorOpt = this.getColorAt(fromFieldCoord);
        } while (fromFieldCoord.y < FieldCoord.Y_SIZE - 1 && fromColorOpt.isEmpty());

        if (fromColorOpt.isEmpty()) {
          continue;
        }

        const fromColor = fromColorOpt.get();
        // 移動: 上のぷよを落とす（元の位置を削除し、新しい位置に色をセット）
        const fromKey: FieldKey = this.keyOf(fromFieldCoord);
        const toKey: FieldKey = this.keyOf(toFieldCoord);
        this._puyoMap.delete(fromKey);
        this._puyoMap.set(toKey, fromColor);

        // 落下イベント登録
        dropEvents.push(new PuyoDropped(fromFieldCoord, toFieldCoord, fromColor));
      }
    }

    return new DropEvent(dropEvents);
  }

  /**
   * インターフェースへ変換する
   */
  toInterface(): FieldPuyoInterface[] {
    const result: FieldPuyoInterface[] = [];
    for (const [key, color] of this._puyoMap.entries()) {
      const coord = this.coordOfKey(key);
      // connect の動的算出
      let connectIF = new Connect().toInterface();
      if (!coord.isGhost() && color.isColor()) {
        const connectArray: boolean[] = [];
        Coord.ARBL.forEach((urdlCoord) => {
          try {
            const neighborCoord = coord.add(urdlCoord);
            const neighborColorOpt = this.getColorAt(neighborCoord);

            if (neighborColorOpt.isEmpty()) {
              connectArray.push(false);
              return;
            }

            if (neighborCoord.isGhost()) {
              connectArray.push(false);
              return;
            }

            const neighborColor = neighborColorOpt.get();
            const connect = color.equals(neighborColor);
            connectArray.push(connect);
          } catch (e) {
            connectArray.push(false);
          }
        });
        connectIF = new Connect(
          connectArray[0],
          connectArray[1],
          connectArray[2],
          connectArray[3]
        ).toInterface();
      }

      result.push({
        puyoColor: color.value,
        fieldCoord: coord.toInterface(),
        connect: connectIF,
      });
    }
    return result;
  }

  /**
   * インターフェースから生成する
   */
  static from(fieldPuyosIF: FieldPuyoInterface[]): Field {
    const map = new Map<FieldKey, PuyoColor>();
    for (const pIF of fieldPuyosIF) {
      const color = PuyoColor.fromValue(pIF.puyoColor);
      const coord = new FieldCoord(pIF.fieldCoord.x, pIF.fieldCoord.y);
      const key: FieldKey = coord.y * FieldCoord.X_SIZE + coord.x;
      map.set(key, color);
    }
    return new Field(map);
  }
}
