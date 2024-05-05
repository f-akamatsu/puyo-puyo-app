export interface FieldPuyoInterface {
  puyoColor: number;
  fieldCoord: FieldCoordInterface;
  connect: ConnectInterface;
}

export interface FieldCoordInterface {
  x: number;
  y: number;
}

export interface ConnectInterface {
  above: boolean;
  right: boolean;
  below: boolean;
  left: boolean;
}
