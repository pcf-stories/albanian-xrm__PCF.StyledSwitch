import { useContext, useMemo } from 'react';

import Switch from '@mui/material/Switch/Switch';
import styled from '@mui/material/styles/styled';

import StyleContext from '@albanian-xrm/styled-switch/StyleContext';

const ASPECT_RATIO = 2.5;

const UISwitch = styled(Switch)(() => {
  let {
    FalseHandleFill,
    FalseHandleImage,
    FalseTrackFill,
    Height: height = 34,
    TrueHandleFill,
    TrueTrackFill,
    TrueHandleImage,
    Width: width = 62,
  } = useContext(StyleContext);

  if (width < height * ASPECT_RATIO && width > 0) {
    height = Math.floor(width / ASPECT_RATIO);
  }
  if (height > 0) {
    width = height * ASPECT_RATIO;
  }

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
  const iconWidth = height - 2 * padding;

  const falseHandleImage = useMemo(() => {
    const parser = new DOMParser();
    let svg = parser.parseFromString(FalseHandleImage || '', 'image/svg+xml');
    if (svg.documentElement.tagName !== 'svg') {
      svg = parser.parseFromString(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#ff0" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>',
        'image/svg+xml',
      );
    }
    svg.documentElement.setAttribute('height', '' + iconWidth);
    svg.documentElement.setAttribute('width', '' + iconWidth);
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg.documentElement.outerHTML || '')}')`;
  }, [FalseHandleImage, height, padding, iconWidth]);

  const trueHandleImage = useMemo(() => {
    const parser = new DOMParser();
    let svg = parser.parseFromString(TrueHandleImage || '', 'image/svg+xml');

    if (svg.documentElement.tagName !== 'svg') {
      svg = parser.parseFromString(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#fff" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>',
        'image/svg+xml',
      );
    }
    svg.documentElement.setAttribute('height', '' + iconWidth);
    svg.documentElement.setAttribute('width', '' + iconWidth);
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg.documentElement.outerHTML || '')}')`;
  }, [TrueHandleImage, height, padding, iconWidth]);

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
          backgroundImage: trueHandleImage,
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
        backgroundImage: falseHandleImage,
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
