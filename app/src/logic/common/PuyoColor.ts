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
  public static readonly NONE = new PuyoColor(0, 'none');

  private constructor(
    public readonly value: number,
    public readonly name: string
  ) {
    PuyoColor._values.push(this);
  }

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
