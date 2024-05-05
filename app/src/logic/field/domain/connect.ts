import { ConnectInterface } from '@/interfaces/FieldInterfaces';
import { Optional } from 'typescript-optional';

/**
 * くっつき
 */
export class Connect {
  private _above: boolean;
  private _right: boolean;
  private _below: boolean;
  private _left: boolean;

  constructor();

  constructor(above: boolean, right: boolean, below: boolean, left: boolean);

  constructor(above?: boolean, right?: boolean, below?: boolean, left?: boolean) {
    this._above = Optional.ofNullable(above).orElse(false);
    this._right = Optional.ofNullable(right).orElse(false);
    this._below = Optional.ofNullable(below).orElse(false);
    this._left = Optional.ofNullable(left).orElse(false);
  }

  toInterface(): ConnectInterface {
    return {
      above: this._above,
      right: this._right,
      below: this._below,
      left: this._left,
    };
  }
}
