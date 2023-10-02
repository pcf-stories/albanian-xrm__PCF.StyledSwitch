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

import { IHandler, ISubscriber, SwitchValue } from './notifier';
import { IInputs } from './generated/ManifestTypes';

type IRawInputs = Omit<{ [P in keyof IInputs]: IInputs[P]['raw'] }, 'Value'>;

export interface IStyledSwitchProps extends IRawInputs {
  Height?: number;
  Width?: number;
  iconWidth?: number;
}

export interface IAppProps {
  initialStyles: IStyledSwitchProps;
  initialValue: SwitchValue;
  initialVisible: boolean;
  disabled?: boolean;
  onValueChanged: IHandler<SwitchValue>;
  notifier: ISubscriber<SwitchValue>;
  disabledNotifier: ISubscriber<boolean>;
  stylesNotifier: ISubscriber<IStyledSwitchProps>;
  visibleNotifier: ISubscriber<boolean>;
}

