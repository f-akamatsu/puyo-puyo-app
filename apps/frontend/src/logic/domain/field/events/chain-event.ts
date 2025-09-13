import { DropEvent } from './drop-event';
import { EraseEvent } from './erase-event';
import type { ChainEventInterface, OneChainEventInterface } from '@/interfaces/EventInterfaces';

export class ChainEvent {
  private readonly _chain: ReadonlyArray<OneChainEvent>;

  constructor(chain: OneChainEvent[]) {
    this._chain = Object.freeze([...chain]);
  }

  get chain(): ReadonlyArray<OneChainEvent> {
    return this._chain;
  }

  toInterface(): ChainEventInterface {
    return { chain: this._chain.map((c) => c.toInterface()) };
  }
}

export class OneChainEvent {
  private readonly _eraseEvent: EraseEvent;
  private readonly _dropEvent: DropEvent;

  constructor(eraseEvent: EraseEvent, dropEvent: DropEvent) {
    this._eraseEvent = eraseEvent;
    this._dropEvent = dropEvent;
  }

  get eraseEvent(): EraseEvent {
    return this._eraseEvent;
  }

  get dropEvent(): DropEvent {
    return this._dropEvent;
  }

  toInterface(): OneChainEventInterface {
    return {
      eraseEvent: this._eraseEvent.toInterface(),
      dropEvent: this._dropEvent.toInterface(),
    };
  }
}
