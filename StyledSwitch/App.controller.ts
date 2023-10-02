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

import { useState, useEffect, useMemo } from 'react';
import { IAppProps } from './App.types';
import useSwitchStyle from './hooks/useSwitchStyle';

const useAppController = ({
  disabled: disabledProp,
  disabledNotifier,
  initialValue,
  notifier,
  onValueChanged,
  initialStyles,
  initialVisible,
  stylesNotifier,
  visibleNotifier,
}: IAppProps) => {
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(disabledProp);
  const [visible, setVisible] = useState(initialVisible);
  const [stylesState, setStyles] = useState(initialStyles);
  const [handlerId, disabledHandlerId, stylesHandlerId, visibleHandlerId] = useMemo(() => {
    return [
      notifier.subscribe((updatedValue) => {
        setValue(updatedValue);
      }),
      disabledNotifier.subscribe((updatedValue) => {
        setDisabled(updatedValue);
      }),
      stylesNotifier.subscribe((updatedValue) => {
        setStyles(updatedValue);
      }),
      visibleNotifier.subscribe((updatedValue) => {
        setVisible(updatedValue);
      }),
    ];
  }, [notifier, disabledNotifier, stylesNotifier, visibleNotifier]);
  const onChecked = (checked: boolean) => {
    setValue((oldValue) => {
      onValueChanged(checked);
      return checked;
    });
  };
  useEffect(() => {
    return () => {
      notifier.unsubscribe(handlerId);
      disabledNotifier.unsubscribe(disabledHandlerId);
      stylesNotifier.unsubscribe(stylesHandlerId);
      visibleNotifier.unsubscribe(visibleHandlerId);
    };
  }, [handlerId, disabledHandlerId, stylesHandlerId]);

  const { FalseHandleImage, TrueHandleImage, iconWidth, Height, Width } = useSwitchStyle(stylesState);

  const styles = {
    ...stylesState,
    FalseHandleImage,
    Height,
    iconWidth,
    TrueHandleImage,
    Width,
  };

  return {
    disabled,
    onChecked,
    value,
    styles,
    visible,
  };
};

export default useAppController;
