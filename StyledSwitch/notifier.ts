/*
   Copyright 2022 Betim Beja, AlbanianXrm

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

export type SwitchValue = boolean;

export interface IHandler<T> {
  (updatedValue: T): void;
}

export interface INotifier<T> {
  notify: IHandler<T>;
}

export interface ISubscriber<T> {
  subscribe: (handler: IHandler<T>) => number;
  unsubscribe: (handlerId: number) => void;
}

interface ISubscriptionStore<T> {
  [handlerId: number]: IHandler<T>;
}

export class Notifier<T> implements INotifier<T>, ISubscriber<T> {
  private handlerId = 0;
  private lastValue:T;
  private subscriptions: ISubscriptionStore<T> = {};
  subscribe(handler: IHandler<T>) {
    this.handlerId = this.handlerId / Number.MAX_VALUE + 1;
    this.subscriptions[this.handlerId] = handler;
    if(this.lastValue!==undefined){
      handler(this.lastValue);
    }
    return this.handlerId;
  }
  unsubscribe(handlerId: number) {
    delete this.subscriptions[handlerId];
  }
  notify(updatedValue: T) {
    this.lastValue=updatedValue;
    for (var handlerId in this.subscriptions) {
      this.subscriptions[handlerId](updatedValue);
    }
  }
}
