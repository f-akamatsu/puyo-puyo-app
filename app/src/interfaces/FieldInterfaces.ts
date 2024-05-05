export interface FieldPuyoInterface {
  puyoColor: number;
  coord: CoordInterface;
  connect: ConnectInterface;
}

export interface CoordInterface {
  x: number;
  y: number;
}

export interface ConnectInterface {
  above: boolean;
  right: boolean;
  below: boolean;
  left: boolean;
}
