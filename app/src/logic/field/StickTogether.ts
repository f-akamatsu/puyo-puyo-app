import { Optional } from 'typescript-optional';

/**
 * くっつき
 */
export class StickTogether {
  private _up: boolean;
  private _right: boolean;
  private _down: boolean;
  private _left: boolean;

  constructor();

  constructor(up: boolean, right: boolean, down: boolean, left: boolean);

  constructor(up?: boolean, right?: boolean, down?: boolean, left?: boolean) {
    this._up = Optional.ofNullable(up).orElse(false);
    this._right = Optional.ofNullable(right).orElse(false);
    this._down = Optional.ofNullable(down).orElse(false);
    this._left = Optional.ofNullable(left).orElse(false);
  }
}
