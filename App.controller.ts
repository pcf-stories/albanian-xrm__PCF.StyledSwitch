import { useState, useEffect, useMemo } from 'react';
import { IAppProps } from '@albanian-xrm/styled-switch/App.types';

const useAppController = ({
  disabled: disabledProp,
  disabledNotifier,
  initialValue,
  notifier,
  onValueChanged,
  styles,
  stylesNotifier,
}: IAppProps) => {
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(disabledProp);
  const [context, setContext] = useState(styles);
  const [handlerId, disabledHandlerId, stylesHandlerId] = useMemo(() => {
    return [
      notifier.subscribe((updatedValue) => {
        setValue(updatedValue);
      }),
      disabledNotifier.subscribe((updatedValue) => {
        setDisabled(updatedValue);
      }),
      stylesNotifier.subscribe((updatedValue) => {
        setContext(updatedValue);
      }),
    ];
  }, [notifier, disabledNotifier, stylesNotifier]);
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
    };
  }, [handlerId, disabledHandlerId, stylesHandlerId]);

  return {
    disabled,
    onChecked,
    value,
    context,
  };
};

export default useAppController;
