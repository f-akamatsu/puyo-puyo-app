/**
 * おじゃま単位
 */
export class OjamaDenomination {
  private static _values = new Array<OjamaDenomination>();

  public static readonly SMALL = new OjamaDenomination('small', 1);
  public static readonly MEDIUM = new OjamaDenomination('medium', 6);
  public static readonly ROCK = new OjamaDenomination('rock', 30);
  public static readonly STAR = new OjamaDenomination('star', 180);
  public static readonly MOON = new OjamaDenomination('moon', 360);
  public static readonly CROWN = new OjamaDenomination('crown', 720);
  public static readonly COMMET = new OjamaDenomination('commet', 1440);

  private constructor(
    public readonly type: string,
    public readonly unit: number
  ) {
    OjamaDenomination._values.push(this);
  }

  public static get values(): OjamaDenomination[] {
    return OjamaDenomination._values;
  }
}
