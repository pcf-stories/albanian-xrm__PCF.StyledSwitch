import { useState, useEffect, useMemo } from 'react';
import { IAppProps } from '@albanian-xrm/styled-switch/App.types';
import useSwitchStyle from '@albanian-xrm/styled-switch/hooks/useSwitchStyle';

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
