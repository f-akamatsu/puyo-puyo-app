export interface FieldPuyoInterface {
  color: number;
  coord: CoordInterface;
  connect: FieldPuyoConnectInterface;
}

export interface CoordInterface {
  x: number;
  y: number;
}

export interface FieldPuyoConnectInterface {
  isConnectedToAbove: boolean;
  isConnectedToRight: boolean;
  isConnectedToBelow: boolean;
  isConnectedToLeft: boolean;
}
