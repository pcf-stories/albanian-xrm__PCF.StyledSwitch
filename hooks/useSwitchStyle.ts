import { useMemo } from 'react';
import { IStyledSwitchProps } from '@albanian-xrm/styled-switch/App.types';

const ASPECT_RATIO = 2.5;

const useSwitchStyle = (stylesState: IStyledSwitchProps) => {
  return useMemo(() => {
    let Height = stylesState.Height || 0;
    let Width = stylesState.Width || 0;
    if (Width < Height * ASPECT_RATIO && Width > 0) {
      Height = Math.floor(Width / ASPECT_RATIO);
    }
    if (Height > 0) {
      Width = Height * ASPECT_RATIO;
    }

    const padding = Math.floor((Height - 4) / 4);
    const iconWidth = Height - 2 * padding;

    const parser = new DOMParser();
    let svg = parser.parseFromString(stylesState.FalseHandleImage || '', 'image/svg+xml');
    if (svg.documentElement.tagName !== 'svg') {
      svg = parser.parseFromString(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#ff0" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>',
        'image/svg+xml',
      );
    }
    svg.documentElement.setAttribute('height', '' + iconWidth);
    svg.documentElement.setAttribute('width', '' + iconWidth);
    const FalseHandleImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(
      svg.documentElement.outerHTML || '',
    )}')`;

    svg = parser.parseFromString(stylesState.TrueHandleImage || '', 'image/svg+xml');

    if (svg.documentElement.tagName !== 'svg') {
      svg = parser.parseFromString(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#fff" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>',
        'image/svg+xml',
      );
    }
    svg.documentElement.setAttribute('height', '' + iconWidth);
    svg.documentElement.setAttribute('width', '' + iconWidth);
    const TrueHandleImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg.documentElement.outerHTML || '')}')`;

    return {
      Height,
      Width,
      FalseHandleImage,
      TrueHandleImage,
      iconWidth,
    };
  }, [
    stylesState.FalseHandleImage,
    stylesState.TrueHandleImage,
    stylesState.iconWidth,
    stylesState.Height,
    stylesState.Width,
  ]);
};

export default useSwitchStyle;
