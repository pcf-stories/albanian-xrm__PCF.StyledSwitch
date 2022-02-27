import { IHandler, ISubscriber, SwitchValue } from '@albanian-xrm/styled-switch/notifier';
import { IInputs } from '@albanian-xrm/styled-switch/generated/ManifestTypes';

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
