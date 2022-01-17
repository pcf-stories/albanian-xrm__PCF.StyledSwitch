import { IHandler, ISubscriber, SwitchValue } from "@albanian-xrm/styled-switch/notifier";

export interface IStyledSwitchProps {
    'FalseHandleFill'?: string;
    'FalseTrackFill'?:string;
    'FalseHandleImage'?:string;
    'TrueHandleFill'?: string;
    'TrueTrackFill'?:string;
    'TrueHandleImage'?:string;
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

