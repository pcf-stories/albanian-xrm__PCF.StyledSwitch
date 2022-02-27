import { createContext } from 'react';
import { IStyledSwitchProps } from '@albanian-xrm/styled-switch/App.types';

const StyleContext = createContext<IStyledSwitchProps>({
  FalseHandleFill: null,
  FalseHandleImage: null,
  FalseTrackFill: null,
  TrueHandleFill: null,
  TrueHandleImage: null,
  TrueTrackFill: null,
});

export default StyleContext;
