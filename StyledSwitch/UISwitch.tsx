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

import Switch from '@mui/material/Switch/Switch';
import styled from '@mui/material/styles/styled';

import { IStyledSwitchProps } from './App.types';

const UISwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop != 'styles',
})(({ styles }: { styles: IStyledSwitchProps }) => {
  let {
    FalseHandleFill,
    FalseHandleImage,
    FalseTrackFill,
    Height: height = 34,
    TrueHandleFill,
    TrueTrackFill,
    TrueHandleImage,
    Width: width = 62,
    iconWidth = 0,
  } = styles;

  if (!FalseHandleFill || FalseHandleFill[0] !== '#') {
    FalseHandleFill = '#1d00a3';
  }
  if (!FalseTrackFill || FalseTrackFill[0] !== '#') {
    FalseTrackFill = '#7051fe';
  }
  if (!TrueHandleFill || TrueHandleFill[0] !== '#') {
    TrueHandleFill = '#86969b';
  }
  if (!TrueTrackFill || TrueTrackFill[0] !== '#') {
    TrueTrackFill = '#bcc5c7';
  }

  const padding = Math.floor((height - 4) / 4);

  return {
    width,
    height: `${height}px`,
    padding,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: `translateX(${padding - 1}px)`,
      '&.Mui-checked': {
        transform: `translateX(${height * 1.5 - padding + 1}px)`,
        '& .MuiSwitch-thumb': {
          backgroundColor: TrueHandleFill,
        },
        '& .MuiSwitch-thumb:before': {
          backgroundImage: TrueHandleImage,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: TrueTrackFill,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: FalseHandleFill,
      width: height - 2,
      height: height - 2,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: FalseHandleImage,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: FalseTrackFill,
      borderRadius: iconWidth / 2,
    },
  };
});

export default UISwitch;
