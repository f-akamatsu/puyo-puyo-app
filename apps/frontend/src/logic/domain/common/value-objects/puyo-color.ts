import { Optional } from 'typescript-optional';

/**
 * ぷよぷよの色を表すEnum
 */
export class PuyoColor {
  private static _values = new Array<PuyoColor>();

  public static readonly GREEN = new PuyoColor(1, 'green');
  public static readonly RED = new PuyoColor(2, 'red');
  public static readonly BLUE = new PuyoColor(3, 'blue');
  public static readonly YELLOW = new PuyoColor(4, 'yellow');
  public static readonly PURPLE = new PuyoColor(5, 'purple');
  public static readonly OJAMA = new PuyoColor(9, 'ojama');

  private constructor(
    public readonly value: number,
    public readonly name: string
  ) {
    PuyoColor._values.push(this);
  }

  public static get values(): PuyoColor[] {
    return PuyoColor._values;
  }

  /**
   *
   */
  static fromValue(value: number): PuyoColor {
    const puyoColor = Optional.ofNullable(this._values.find((p) => p.value === value));
    return puyoColor.get();
  }

  /**
   * 等価性（値オブジェクトとしての等価）
   */
  equals(other: PuyoColor): boolean {
    return this.value === other.value;
  }

  /**
   * 色ぷよか
   */
  isColor(): boolean {
    return (
      this.equals(PuyoColor.GREEN) ||
      this.equals(PuyoColor.RED) ||
      this.equals(PuyoColor.BLUE) ||
      this.equals(PuyoColor.YELLOW) ||
      this.equals(PuyoColor.PURPLE)
    );
  }

  /**
   * おじゃまぷよか
   */
  isOjama(): boolean {
    return this.equals(PuyoColor.OJAMA);
  }
}
