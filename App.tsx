import React from 'react';

import { IAppProps } from '@albanian-xrm/styled-switch/App.types';
import useAppController from '@albanian-xrm/styled-switch/App.controller';
import UISwitch from '@albanian-xrm/styled-switch/UISwitch';

const App = (props: IAppProps) => {
  const { styles, disabled, onChecked, value, visible } = useAppController(props);
  return visible ? (
    <UISwitch styles={styles} checked={value} disabled={disabled} onChange={(event, checked) => onChecked(checked)} />
  ) : (
    <></>
  );
};

export default App;
