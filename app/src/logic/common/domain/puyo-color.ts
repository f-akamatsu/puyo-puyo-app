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
   * 色ぷよか
   */
  isColor(): boolean {
    return (
      this === PuyoColor.GREEN ||
      this === PuyoColor.RED ||
      this === PuyoColor.BLUE ||
      this === PuyoColor.YELLOW ||
      this === PuyoColor.PURPLE
    );
  }
}
