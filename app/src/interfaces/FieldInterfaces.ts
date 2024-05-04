export interface FieldPuyoInterface {
  puyoColor: number;
  coord: CoordInterface;
  stickTogether: StickTogetherInterface;
}

export interface CoordInterface {
  x: number;
  y: number;
}

export interface StickTogetherInterface {
  above: boolean;
  right: boolean;
  below: boolean;
  left: boolean;
}
