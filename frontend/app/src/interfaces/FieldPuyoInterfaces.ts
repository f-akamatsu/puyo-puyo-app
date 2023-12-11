export interface FieldPuyoInterface {
  pColor: number;
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

export interface FieldInterface {
  fieldPuyoList: FieldPuyoInterface[];
  score: number;
}
