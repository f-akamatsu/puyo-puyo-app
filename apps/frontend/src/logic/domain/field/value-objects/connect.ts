import { ConnectInterface } from '@/interfaces/FieldInterfaces';
import { Optional } from 'typescript-optional';

/**
 * くっつき
 */
export class Connect {
  private readonly _above: boolean;
  private readonly _right: boolean;
  private readonly _below: boolean;
  private readonly _left: boolean;

  constructor();

  constructor(above: boolean, right: boolean, below: boolean, left: boolean);

  constructor(above?: boolean, right?: boolean, below?: boolean, left?: boolean) {
    this._above = Optional.ofNullable(above).orElse(false);
    this._right = Optional.ofNullable(right).orElse(false);
    this._below = Optional.ofNullable(below).orElse(false);
    this._left = Optional.ofNullable(left).orElse(false);
  }

  /**
   *
   */
  toInterface(): ConnectInterface {
    return {
      above: this._above,
      right: this._right,
      below: this._below,
      left: this._left,
    };
  }
}
