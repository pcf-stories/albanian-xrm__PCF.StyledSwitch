import {createContext} from 'react';
import { IStyledSwitchProps } from '@albanian-xrm/styled-switch/App.types';

const StyleContext = createContext<IStyledSwitchProps>({});

export default StyleContext;