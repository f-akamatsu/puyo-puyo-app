// おじゃま予告（UIとロジックのインターフェース）

export interface OjamaPackInterface {
  /** 表示種別（small/medium/rock/star/moon/crown/commet など） */
  type: string;
  /** 単位（1,6,30,180,360,720,1440 など） */
  unit: number;
  /** その単位の個数 */
  count: number;
}

export interface OjamaForecastInterface {
  /** 送信するおじゃま総個数（70点=1個換算） */
  ojamaCount: number;
  /** 予告アイコンの内訳（大きい単位からの分解結果） */
  packs: OjamaPackInterface[];
}
