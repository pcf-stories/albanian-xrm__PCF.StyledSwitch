import { IHandler, ISubscriber, SwitchValue } from "@albanian-xrm/styled-switch/notifier";
import { IInputs } from "@albanian-xrm/styled-switch/generated/ManifestTypes";

type IRawInputs = Omit<{[P in keyof IInputs]: IInputs[P]['raw']},'Value'>;

export interface IStyledSwitchProps extends IRawInputs {
    Height?: number;
    Width?: number;
}

export interface IAppProps {
    styles: IStyledSwitchProps;   
    initialValue: SwitchValue;
    disabled?: boolean;
    onValueChanged: IHandler<SwitchValue>;
    notifier: ISubscriber<SwitchValue>;
    disabledNotifier: ISubscriber<boolean>;
    stylesNotifier: ISubscriber<IStyledSwitchProps>;
}

