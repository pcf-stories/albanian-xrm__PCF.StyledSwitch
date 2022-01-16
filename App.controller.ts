import { useState, useEffect } from 'react';
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
  const onChecked = (checked: boolean) => {
    setValue((oldValue) => {
      onValueChanged(checked);
      return checked;
    });
  };
  useEffect(() => {
    const handlerId = notifier.subscribe((updatedValue) => {
      setValue(updatedValue);
    });
    const disabledHandlerId = disabledNotifier.subscribe((updatedValue) => {
      setDisabled(updatedValue);
    });
    const stylesHandlerId = stylesNotifier.subscribe((updatedValue)=>{
      setContext(updatedValue);
    })
    return () => {
      notifier.unsubscribe(handlerId);
      disabledNotifier.unsubscribe(disabledHandlerId);
      stylesNotifier.unsubscribe(stylesHandlerId);
    };
  }, []);

  return {
    disabled,
    onChecked,
    value,
    context
  };
};

export default useAppController;
